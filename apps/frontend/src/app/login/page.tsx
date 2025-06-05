"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  signInWithGoogle,
  signInWithEmail,
} from "@/store/services/authService";
import { clearMessages } from "@/store/slices/userSlice";
import { setError } from "@/store/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const auth = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  };
  const { isAuthenticated, isLoading, error } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear any previous messages when component mounts
    dispatch(clearMessages());
  }, [dispatch]);

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError("Please enter both email and password"));
      return;
    }

    try {
      await dispatch(signInWithEmail({ email, password })).unwrap();
    } catch (error) {
      console.error("Email sign in error:", error);
    }
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
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

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to access your account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Google Sign In */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{
              py: 1.5,
              borderColor: "#dadce0",
              color: "#3c4043",
              "&:hover": {
                backgroundColor: "#f8f9fa",
                borderColor: "#dadce0",
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Email/Password Form */}
          <Box component="form" onSubmit={handleEmailSignIn}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5, mt: 2 }}
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary">
            This is a demo application for EBuddy Technical Test
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
