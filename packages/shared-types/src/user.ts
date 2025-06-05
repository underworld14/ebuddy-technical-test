/**
 * Shared User Types for EBuddy Project
 *
 * These interfaces are used by both frontend and backend
 * to ensure type consistency across the application.
 */

export interface User {
  id?: string;
  totalAverageWeightRatings: number;
  numberOfRents: number;
  recentlyActive: number; // epoch time
  createdAt?: number;
  updatedAt?: number;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  message?: string;
  error?: string;
}

export interface UsersResponse {
  success: boolean;
  data?: User[];
  message?: string;
  error?: string;
}

/**
 * Validation helpers for User data
 */
export const isValidRating = (rating: number): boolean => {
  return rating >= 0 && rating <= 5;
};

export const isValidRentCount = (count: number): boolean => {
  return Number.isInteger(count) && count >= 0;
};

/**
 * User creation helper
 */
export const createUser = (
  totalAverageWeightRatings: number,
  numberOfRents: number
): Omit<User, "id" | "createdAt" | "updatedAt"> => {
  return {
    totalAverageWeightRatings,
    numberOfRents,
    recentlyActive: Date.now(),
  };
};
