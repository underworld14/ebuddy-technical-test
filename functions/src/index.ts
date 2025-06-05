/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest, onCall } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Simple HTTP placeholder function for updating user data
export const updateUserData = onRequest({ cors: true }, (req, res) => {
  logger.info("updateUserData called", { method: req.method, body: req.body });

  res.json({
    success: true,
    message: "Placeholder updateUserData function called successfully",
    data: {
      id: "test-user-123",
      totalAverageWeightRatings: 4.5,
      numberOfRents: 25,
      recentlyActive: Date.now(),
    },
    timestamp: new Date().toISOString(),
    source: "firebase-emulator",
  });
});

// Simple HTTP placeholder function for fetching user data
export const fetchUserData = onRequest({ cors: true }, (req, res) => {
  logger.info("fetchUserData called", { method: req.method });

  res.json({
    success: true,
    message: "Placeholder fetchUserData function called successfully",
    data: {
      id: "test-user-123",
      totalAverageWeightRatings: 4.3,
      numberOfRents: 30,
      recentlyActive: Date.now(),
      createdAt: Date.now() - 86400000, // 1 day ago
      updatedAt: Date.now(),
    },
    timestamp: new Date().toISOString(),
    source: "firebase-emulator",
  });
});

// Callable function placeholder (alternative approach)
export const testCallableFunction = onCall((request) => {
  logger.info("testCallableFunction called", { data: request.data });

  return {
    success: true,
    message: "Placeholder callable function works!",
    receivedData: request.data,
    timestamp: new Date().toISOString(),
    source: "firebase-emulator",
  };
});

// Health check function
export const healthCheck = onRequest({ cors: true }, (req, res) => {
  logger.info("Health check called");

  res.json({
    success: true,
    message: "Firebase Functions emulator is running!",
    timestamp: new Date().toISOString(),
    status: "healthy",
  });
});
