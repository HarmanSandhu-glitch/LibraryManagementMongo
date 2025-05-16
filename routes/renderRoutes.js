import express from "express";
import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/bookControllers.js";

const renderRouter = express.Router();

renderRouter.get("/auth/admin/login", (req, res) => {
  // res.send("Hello World");
  res.render("../Frontend/AuthenticationPages/AdminLogin");
});

renderRouter.get("/auth/admin/register", (req, res) => {
  res.render("../Frontend/AuthenticationPages/AdminRegister");
});

renderRouter.get("/auth/student/login", (req, res) => {
  res.render("../Frontend/AuthenticationPages/StudentLogin");
});

renderRouter.get("/auth/student/register", (req, res) => {
  res.render("../Frontend/AuthenticationPages/StudentRegister");
});

renderRouter.get("/Home", async (req, res) => {
  console.log("home")
  const {success, data: books} = await getAllBooks();
  if(!success) {
    return res.status(500).json({success, message: "Error fetching books"});
  }
  res.render("../Frontend/Home/Home", {books});
});

renderRouter.get("/Library", async (req, res) => {
  console.log("Library");
  const {success, data: books} = await getAllBooks();
  if(!success) {
    return res.status(500).json({success, message: "Error fetching books"});
  };
  res.render("../Frontend/Library/Library",{books});
});

renderRouter.get("/addBook",async(req,res)=>{
  console.log("add book");
  res.render("../Frontend/AddBook/AddBook");
})

export default renderRouter;