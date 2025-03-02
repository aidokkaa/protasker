import express from "express";
import { getAllUsersController,getUserController } from "../controllers/users";
import { verifyManagerRole, verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, verifyManagerRole, getAllUsersController);
router.get("/:id", verifyToken
    , getUserController);

export default router;
