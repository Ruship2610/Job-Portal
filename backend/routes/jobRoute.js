import express from "express";
import { getJobByAdmin, getJobById, getJobs, postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/authentication.js";
const router = express.Router();

router.post("/post" ,isAuthenticated, postJob);
router.get("/get" ,isAuthenticated, getJobs);
router.get("/get/:id" ,isAuthenticated, getJobById);
router.get("/getadminjobs" ,isAuthenticated, getJobByAdmin);

export default router;