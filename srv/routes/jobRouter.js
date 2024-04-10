import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJobs,
  updateJob,
} from "../controllers/jobController.js";
import { verifyToken } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllJobs", verifyToken, getAllJobs);
router.post("/postJobs", verifyToken, postJobs);
router.get("/getMyJobs", verifyToken, getMyJobs);
router.put("/updateJob/:id", verifyToken, updateJob);
router.delete("/deleteJob/:id", verifyToken, deleteJob);
router.get("/getSingleJob/:id", verifyToken, getSingleJob);

export default router;
