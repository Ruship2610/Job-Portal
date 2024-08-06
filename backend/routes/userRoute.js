import express from "express";
const router = express.Router();
import {login,register,updateProfile,logout} from "../controllers/user.js"
import isAuthenticated from "../middlewares/authentication.js";


router.post("/register" , register );
router.post("/login" , login);
router.post("/profile/update" , isAuthenticated , updateProfile);
router.patch("/logout" , logout);

export default router;
