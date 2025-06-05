import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";

export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Authorization token required",
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify the Firebase ID token
      const decodedToken = await auth.verifyIdToken(token);

      // Add user info to request object
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };

      next();
    } catch (tokenError) {
      console.error("Token verification failed:", tokenError);
      res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
      return;
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during authentication",
    });
    return;
  }
};
