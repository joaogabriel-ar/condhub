import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.login);
router.post("/verify", authController.verifyToken)

export default router;