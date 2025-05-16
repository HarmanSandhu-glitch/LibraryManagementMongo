import express from "express";
import {
    adminLogin,
    studentLogin,
    adminRegister,
    studentRegister,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

// Route for admin login
authRouter.post("/admin/login", adminLogin);

// Route for student login
authRouter.post("/student/login", studentLogin);

// Route for admin registration
authRouter.post("/admin/register", adminRegister);

// Route for student registration
authRouter.post("/student/register", studentRegister);

export default authRouter;
