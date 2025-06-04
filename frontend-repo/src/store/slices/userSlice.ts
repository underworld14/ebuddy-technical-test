import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/apis/user";

interface UserState {
  userData: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  isFetching: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: UserState = {
  userData: null,
  isLoading: false,
  isUpdating: false,
  isFetching: false,
  error: null,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Update user data actions
    updateUserStart: (state) => {
      state.isUpdating = true;
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<{ data: User; message?: string }>
    ) => {
      state.isUpdating = false;
      state.isLoading = false;
      state.userData = action.payload.data;
      state.successMessage =
        action.payload.message || "User data updated successfully";
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    // Fetch user data actions
    fetchUserStart: (state) => {
      state.isFetching = true;
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchUserSuccess: (
      state,
      action: PayloadAction<{ data: User; message?: string }>
    ) => {
      state.isFetching = false;
      state.isLoading = false;
      state.userData = action.payload.data;
      state.successMessage =
        action.payload.message || "User data fetched successfully";
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.isLoading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    // Clear messages and reset state
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.error = null;
      state.successMessage = null;
      state.isLoading = false;
      state.isUpdating = false;
      state.isFetching = false;
    },
  },
});

export const {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  clearMessages,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
