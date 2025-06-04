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
