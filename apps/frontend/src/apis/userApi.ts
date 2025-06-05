import { UserResponse } from "./user";
import { auth } from "./firebaseConfig";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

class UserApi {
  private async getAuthToken(): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new ApiError("User not authenticated", 401);
    }

    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Failed to get auth token:", error);
      throw new ApiError("Failed to get authentication token", 401);
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const token = await this.getAuthToken();

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      console.error("API request failed:", error);
      throw new ApiError(
        error instanceof Error ? error.message : "Unknown error occurred",
        500
      );
    }
  }

  async updateUserData(userData: {
    totalAverageWeightRatings: number;
    numberOfRents: number;
  }): Promise<UserResponse> {
    return this.makeRequest<UserResponse>("/api/users/update-user-data", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async fetchUserData(): Promise<UserResponse> {
    return this.makeRequest<UserResponse>("/api/users/fetch-user-data", {
      method: "GET",
    });
  }

  // Health check endpoint for testing connectivity
  async healthCheck(): Promise<{
    success: boolean;
    message: string;
    timestamp: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error("Health check failed:", error);
      throw new ApiError("Backend server is not reachable", 503);
    }
  }
}

export const userApi = new UserApi();
export { ApiError };
