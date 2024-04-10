import express from "express";
import {
  deleteApplication,
  employeerGetAllApplications,
  jobSeekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { verifyToken } from "../controllers/userController.js";

const router = express.Router();
router.get(
  "/employeerGetAllApplications",
  verifyToken,
  employeerGetAllApplications
);
router.get(
  "/jobSeekerGetAllApplications",
  verifyToken,
  jobSeekerGetAllApplications
);
router.delete("/deleteApplication/:id", verifyToken, deleteApplication);
router.post("/postApplication", verifyToken, postApplication);

export default router;
