import express from "express";
import {
    adminLogin,
    studentLogin,
    adminRegister,
    studentRegister,
    logout
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/admin/login", adminLogin);
authRouter.post("/student/login", studentLogin);
authRouter.post("/admin/register", adminRegister);
authRouter.post("/student/register", studentRegister);
authRouter.post("/logout", (req,res)=>{
    console.log("logout route");
    logout(req,res);
});

export default authRouter;
