import express from "express";
import {
  getUser,
  handleLogin,
  handleRegister,
  verifyToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/getUser", verifyToken, getUser);

export default router;
