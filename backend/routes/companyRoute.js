import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/authentication.js";
const router = express.Router();

router.post("/register",isAuthenticated,registerCompany);
router.get("/get",isAuthenticated,getCompany);
router.get("/getbyid/:id",isAuthenticated,getCompanyById);
router.patch("/updateinfo/:id",isAuthenticated,updateCompany);

export default router;