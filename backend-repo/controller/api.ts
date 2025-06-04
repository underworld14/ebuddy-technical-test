import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { UserRepository } from "../repository/userCollection";
import { User, UserResponse } from "../entities/user";

const userRepository = new UserRepository();

export const updateUserData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    const { totalAverageWeightRatings, numberOfRents } = req.body;

    // Validate required fields
    if (
      totalAverageWeightRatings === undefined ||
      numberOfRents === undefined
    ) {
      res.status(400).json({
        success: false,
        error: "totalAverageWeightRatings and numberOfRents are required",
      });
      return;
    }

    // Validate data types and ranges
    if (
      typeof totalAverageWeightRatings !== "number" ||
      typeof numberOfRents !== "number" ||
      totalAverageWeightRatings < 0 ||
      totalAverageWeightRatings > 5 ||
      numberOfRents < 0
    ) {
      res.status(400).json({
        success: false,
        error:
          "Invalid data: totalAverageWeightRatings must be 0-5, numberOfRents must be >= 0",
      });
      return;
    }

    const userData: Partial<User> = {
      totalAverageWeightRatings,
      numberOfRents,
    };

    // Check if user exists, if not create new user
    const existingUser = await userRepository.getUserById(userId);
    let updatedUser: User;

    if (existingUser) {
      updatedUser = await userRepository.updateUser(userId, userData);
    } else {
      updatedUser = await userRepository.createUser(userId, {
        totalAverageWeightRatings,
        numberOfRents,
        recentlyActive: Date.now(),
      });
    }

    const response: UserResponse = {
      success: true,
      data: updatedUser,
      message: "User data updated successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updateUserData:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while updating user data",
    });
  }
};

export const fetchUserData = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.uid;

    if (!userId) {
      res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
      return;
    }

    // Update user activity when fetching data
    try {
      await userRepository.updateUserActivity(userId);
    } catch (activityError) {
      console.warn("Failed to update user activity:", activityError);
      // Continue with fetch even if activity update fails
    }

    const user = await userRepository.getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    const response: UserResponse = {
      success: true,
      data: user,
      message: "User data fetched successfully",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in fetchUserData:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching user data",
    });
  }
};
