import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import type { AuthState, UserState } from "./types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Specialized selectors with explicit typing
export const useAuthSelector = () =>
  useSelector((state: RootState): AuthState => state.auth);
export const useUserSelector = () =>
  useSelector((state: RootState): UserState => state.user);
