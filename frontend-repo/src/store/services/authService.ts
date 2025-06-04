import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "@/apis/firebaseConfig";
import { setError } from "@/store/slices/authSlice";

// Google Sign In
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      return { user: result.user, idToken };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google sign in failed";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Email/Password Sign In
export const signInWithEmail = createAsyncThunk(
  "auth/signInWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await result.user.getIdToken();
      return { user: result.user, idToken };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Email sign in failed";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Email/Password Sign Up
export const signUpWithEmail = createAsyncThunk(
  "auth/signUpWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await result.user.getIdToken();
      return { user: result.user, idToken };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Email sign up failed";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Sign Out
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign out failed";
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
