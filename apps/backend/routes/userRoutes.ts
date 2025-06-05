import { Router, type IRouter } from "express";
import { updateUserData, fetchUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router: IRouter = Router();

// Apply auth middleware to all user routes
router.use(authMiddleware);

router.patch("/update-user-data", updateUserData);
router.get("/fetch-user-data", fetchUserData);

export default router;
