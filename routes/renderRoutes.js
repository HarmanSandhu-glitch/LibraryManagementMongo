import express from "express";
import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/bookControllers.js";
import {getAllStudents, fetchAllStudents} from "../controllers/studentControllers.js";
import Student from "../models/studentModel.js";
import Book from "../models/bookModel.js";
import jwt from "jsonwebtoken";

const renderRouter = express.Router();

renderRouter.get("/auth/admin/login", (req, res) => {
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
  console.log(req.cookies);
  res.render("../Frontend/Home/Home", { 
    books,
    req,
    token: req.cookies?.token || null
  });
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

renderRouter.get("/adminDashboard",async(req,res)=>{
  const {success: booksSuccess, data: books} = await getAllBooks();
  if(!booksSuccess) {
    return res.status(500).json({success: booksSuccess, message: "Error fetching books"});
  }
  const {success: studentsSuccess, data: students} = await fetchAllStudents();
  if(!studentsSuccess) {
    return res.status(500).json({success: studentsSuccess, message: "Error fetching students"});
  }
  console.log("admin dashboard");
  res.render("../Frontend/Dashboards/adminDashboard", { books, students });
})

renderRouter.get("/studentDashboard/",async(req,res)=>{
  console.log("student dashboard");
  try {    
    const token = req.cookies?.token || null;
    if(!token) {
      return res.redirect("/auth/student/login");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    if(!student) {
      return res.redirect("/home");
    }
    const borrowedBooks = [];
    try {
      for(let i=0;i<student.booksBorrowed.length;i++){
        const borrowedBook = student.booksBorrowed[i];
        const book = await Book.findById(borrowedBook.bookId);
        if(book) {
          borrowedBooks.push(book);
        }
      }
      console.log("borrowed books",borrowedBooks);
    } catch(err) {
      console.error("Error loading borrowed books:", err);
    }
    res.render("../Frontend/Dashboards/studentDashboard", { student, borrowedBooks });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.redirect("/auth/student/login");
  }
})

export default renderRouter;