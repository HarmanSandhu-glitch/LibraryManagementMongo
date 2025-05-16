import express from "express";
import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/bookControllers.js";
import {borrowBook, returnBook} from "../controllers/studentControllers.js";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", createBook);
bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.post("/borrow/", borrowBook);
bookRouter.post("/return/", returnBook);
export default bookRouter;
