import express from "express";
import { borrowBook, returnBook } from "../controllers/studentControllers.js";

const studentRouter = express.Router();

studentRouter.post("/borrowbook",(req,res)=>{
    console.log("borrow book route");
    borrowBook(req,res);
} );

studentRouter.post("/returnbook",(req,res)=>{
    console.log("return book route");
    returnBook(req,res);
} );

export default studentRouter;
