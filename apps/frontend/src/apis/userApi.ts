import { UserResponse } from "./user";
import { auth } from "./firebaseConfig";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

// Firebase Functions Emulator URL (for testing)
const FUNCTIONS_EMULATOR_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5001/ebuddy-technical-test-8c82d/us-central1" // Replace 'ebuddy-dev' with your project ID
    : null;

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

  // Firebase Functions emulator methods (for testing)
  async testFirebaseFunctions() {
    if (!FUNCTIONS_EMULATOR_URL) {
      throw new ApiError("Functions emulator not available in production", 400);
    }

    const results = {
      healthCheck: null as unknown,
      fetchUserData: null as unknown,
      updateUserData: null as unknown,
    };

    try {
      // Test health check
      const healthResponse = await fetch(
        `${FUNCTIONS_EMULATOR_URL}/healthCheck`
      );
      results.healthCheck = await healthResponse.json();

      // Test fetch user data
      const fetchResponse = await fetch(
        `${FUNCTIONS_EMULATOR_URL}/fetchUserData`
      );
      results.fetchUserData = await fetchResponse.json();

      // Test update user data
      const updateResponse = await fetch(
        `${FUNCTIONS_EMULATOR_URL}/updateUserData`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalAverageWeightRatings: 4.8,
            numberOfRents: 42,
          }),
        }
      );
      results.updateUserData = await updateResponse.json();

      return {
        success: true,
        message: "All Firebase Functions tests completed",
        results,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      throw new ApiError(
        `Firebase Functions test failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        500
      );
    }
  }

  async updateUserData(userData?: {
    totalAverageWeightRatings: number;
    numberOfRents: number;
  }): Promise<UserResponse> {
    return this.makeRequest<UserResponse>("/api/users/update-user-data", {
      method: "PATCH",
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
