"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Refresh, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserData, fetchUserData } from "@/store/services/userService";
import { clearMessages } from "@/store/slices/userSlice";
import { User } from "@/apis/user";

export default function UpdateButton() {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [totalAverageWeightRatings, setTotalAverageWeightRatings] =
    useState("");
  const [numberOfRents, setNumberOfRents] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user) as {
    userData: User | null;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
  };
  const { userData, isLoading, error, successMessage } = user;

  const handleFetchUser = async () => {
    dispatch(clearMessages());
    try {
      await dispatch(fetchUserData()).unwrap();
      setOpen(true);
    } catch (error) {
      console.error("Fetch user error:", error);
    }
  };

  const handleUpdateUser = async () => {
    const ratings = parseFloat(totalAverageWeightRatings);
    const rents = parseInt(numberOfRents);

    if (
      isNaN(ratings) ||
      isNaN(rents) ||
      ratings < 0 ||
      ratings > 5 ||
      rents < 0
    ) {
      return;
    }

    try {
      await dispatch(
        updateUserData({
          totalAverageWeightRatings: ratings,
          numberOfRents: rents,
        })
      ).unwrap();

      setEditMode(false);
      setTotalAverageWeightRatings("");
      setNumberOfRents("");
    } catch (error) {
      console.error("Update user error:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setTotalAverageWeightRatings("");
    setNumberOfRents("");
    dispatch(clearMessages());
  };

  const startEdit = () => {
    if (userData) {
      setTotalAverageWeightRatings(
        userData.totalAverageWeightRatings.toString()
      );
      setNumberOfRents(userData.numberOfRents.toString());
    }
    setEditMode(true);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={handleFetchUser}
        disabled={isLoading}
        size="large"
        sx={{ minWidth: 200 }}
      >
        {isLoading ? "Loading..." : "Fetch User Data"}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">User Information</Typography>
            {userData && !editMode && (
              <Button
                startIcon={<Edit />}
                onClick={startEdit}
                variant="outlined"
                size="small"
              >
                Edit
              </Button>
            )}
          </Box>
        </DialogTitle>

        <DialogContent>
          {isLoading && (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {userData && !editMode && (
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      User ID
                    </Typography>
                    <Typography variant="body1">
                      {userData.id || "N/A"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Average Weight Ratings
                    </Typography>
                    <Typography variant="body1">
                      {userData.totalAverageWeightRatings} / 5
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Number of Rents
                    </Typography>
                    <Typography variant="body1">
                      {userData.numberOfRents}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Recently Active
                    </Typography>
                    <Typography variant="body1">
                      {new Date(userData.recentlyActive).toLocaleString()}
                    </Typography>
                  </Box>

                  {userData.createdAt && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Created At
                      </Typography>
                      <Typography variant="body1">
                        {new Date(userData.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  )}

                  {userData.updatedAt && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Updated At
                      </Typography>
                      <Typography variant="body1">
                        {new Date(userData.updatedAt).toLocaleString()}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}

          {editMode && (
            <Stack spacing={3}>
              <TextField
                label="Total Average Weight Ratings"
                type="number"
                value={totalAverageWeightRatings}
                onChange={(e) => setTotalAverageWeightRatings(e.target.value)}
                fullWidth
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                helperText="Rating from 0 to 5"
                required
              />

              <TextField
                label="Number of Rents"
                type="number"
                value={numberOfRents}
                onChange={(e) => setNumberOfRents(e.target.value)}
                fullWidth
                inputProps={{ min: 0 }}
                helperText="Total number of rentals"
                required
              />
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button
                onClick={handleUpdateUser}
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
