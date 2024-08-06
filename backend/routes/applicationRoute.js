import express from "express";
import { appliedJobs, applyJob, getApplicants, updateStatus } from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/authentication.js";
const router = express.Router();

router.get("/apply/:id",isAuthenticated,applyJob);
router.get("/getjobs",isAuthenticated,appliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.post("/status/update/:id",isAuthenticated,updateStatus);

export default router;