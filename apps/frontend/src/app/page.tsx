"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Logout, AccountCircle } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signOutUser } from "@/store/services/authService";
import { clearUserData } from "@/store/slices/userSlice";
import UpdateButton from "@/components/UpdateButton";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Use proper type assertion to fix TypeScript issues
  const auth = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: { email?: string } | null;
    error: string | null;
  };
  const { isAuthenticated, isLoading, user, error } = auth;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSignOut = async () => {
    try {
      await dispatch(signOutUser()).unwrap();
      dispatch(clearUserData());
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6">Redirecting to login...</Typography>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EBuddy Test App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2">{user?.email || "Welcome"}</Typography>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Data Management
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            This application allows you to fetch and update user data from the
            backend API. Click the button below to retrieve your current user
            information.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Authentication Error: {error}
            </Alert>
          )}

          <Box sx={{ mt: 4 }}>
            <UpdateButton />
          </Box>
        </Paper>
      </Container>
    </>
  );
}
