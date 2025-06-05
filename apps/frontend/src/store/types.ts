import { User as FirebaseUser } from "firebase/auth";
import { User } from "@/apis/user";

// Auth State Types
export interface AuthState {
  user: FirebaseUser | null;
  idToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// User State Types
export interface UserState {
  userData: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  isFetching: boolean;
  error: string | null;
  successMessage: string | null;
}

// Root State Type
export interface RootState {
  auth: AuthState;
  user: UserState;
}
