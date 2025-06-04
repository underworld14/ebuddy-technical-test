import fs from "fs";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const FIREBASE_SERVICE_ACCOUNT_PATH = process.env
  .FIREBASE_SERVICE_ACCOUNT_PATH as string;

const serviceAccount = JSON.parse(
  fs.readFileSync(FIREBASE_SERVICE_ACCOUNT_PATH, "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
