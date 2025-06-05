import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const USERS_COLLECTION = "USERS";

export class UserRepository {
  private collection = db.collection(USERS_COLLECTION);

  async getUserById(userId: string): Promise<User | null> {
    try {
      const doc = await this.collection.doc(userId).get();

      if (!doc.exists) {
        return null;
      }

      return {
        id: doc.id,
        ...doc.data(),
      } as User;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user data");
    }
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const timestamp = Date.now();
      const updateData = {
        ...userData,
        updatedAt: timestamp,
        recentlyActive: timestamp, // Update recently active when user data is updated
      };

      await this.collection.doc(userId).set(updateData, { merge: true });

      // Return the updated user data
      const updatedUser = await this.getUserById(userId);
      if (!updatedUser) {
        throw new Error("Failed to retrieve updated user data");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user data");
    }
  }

  async createUser(userId: string, userData: Omit<User, "id">): Promise<User> {
    try {
      const timestamp = Date.now();
      const newUserData = {
        ...userData,
        createdAt: timestamp,
        updatedAt: timestamp,
        recentlyActive: timestamp,
      };

      await this.collection.doc(userId).set(newUserData);

      return {
        id: userId,
        ...newUserData,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await this.collection.get();
      const users: User[] = [];

      snapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        } as User);
      });

      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async updateUserActivity(userId: string): Promise<void> {
    try {
      const timestamp = Date.now();
      await this.collection.doc(userId).update({
        recentlyActive: timestamp,
        updatedAt: timestamp,
      });
    } catch (error) {
      console.error("Error updating user activity:", error);
      throw new Error("Failed to update user activity");
    }
  }
}
