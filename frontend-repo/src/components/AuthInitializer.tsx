"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/apis/firebaseConfig";
import { useAppDispatch } from "@/store/hooks";
import { setUser, setLoading, setIdToken } from "@/store/slices/authSlice";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      dispatch(setUser(user));

      if (user) {
        try {
          // Get the ID token when user is authenticated
          const idToken = await user.getIdToken();
          dispatch(setIdToken(idToken));
        } catch (error) {
          console.error("Error getting ID token:", error);
          dispatch(setIdToken(null));
        }
      } else {
        dispatch(setIdToken(null));
      }

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
