import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi, ApiError } from "@/apis/userApi";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "@/store/slices/userSlice";

// Update User Data
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (
    userData: { totalAverageWeightRatings: number; numberOfRents: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateUserStart());
      const response = await userApi.updateUserData(userData);

      if (response.success && response.data) {
        dispatch(
          updateUserSuccess({
            data: response.data,
            message: response.message,
          })
        );
        return response;
      } else {
        const errorMessage = response.error || "Update failed";
        dispatch(updateUserFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Unknown error occurred during update";
      dispatch(updateUserFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch User Data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchUserStart());
      const response = await userApi.fetchUserData();

      if (response.success && response.data) {
        dispatch(
          fetchUserSuccess({
            data: response.data,
            message: response.message,
          })
        );
        return response;
      } else {
        const errorMessage = response.error || "Fetch failed";
        dispatch(fetchUserFailure(errorMessage));
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Unknown error occurred during fetch";
      dispatch(fetchUserFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Health Check
export const checkBackendHealth = createAsyncThunk(
  "user/checkBackendHealth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.healthCheck();
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof ApiError
          ? error.message
          : "Backend health check failed";
      return rejectWithValue(errorMessage);
    }
  }
);
