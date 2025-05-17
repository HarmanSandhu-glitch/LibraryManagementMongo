import Student from "../models/studentModel.js";
import Book from "../models/bookModel.js";
import jwt from "jsonwebtoken";

export const fetchAllStudents = async () => {
    try {
        const students = await Student.find();
        return { success: true, data: students };
    } catch (error) {
        return { success: false, message: "Error fetching students", error };
    }
};

export const borrowBook = async (req, res) => {
    console.log("borrow book");
    try {
        const token = req.cookies.token;
        if (!token) {
            alert("Please login first");
            return res.status(401).json({ success: false, message: "Authentication token missing" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const studentId = decoded.id;

        const { bookId } = req.body;

        const student = await Student.findById(studentId);
        const book = await Book.findById(bookId);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        if (book.copiesAvailable <= 0) {
            return res.status(400).json({ success: false, message: "No copies available for this book" });
        }

        student.booksBorrowed.push({ bookId });
        await student.save();

        book.copiesAvailable -= 1;
        await book.save();

        res.status(200).json({ success: true, message: "Book borrowed successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error borrowing book", error });
    }
};

export const returnBook = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            alert("Please login first");
            return res.status(401).json({ success: false, message: "Authentication token missing" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        const studentId = decoded.id;

        const { bookId } = req.body;

        const student = await Student.findById(studentId);
        const book = await Book.findById(bookId);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        const borrowedBookIndex = student.booksBorrowed.findIndex(
            (borrowedBook) => borrowedBook.bookId.toString() === bookId
        );

        if (borrowedBookIndex === -1) {
            return res.status(400).json({ success: false, message: "Book not borrowed by the student" });
        }

        student.booksBorrowed.splice(borrowedBookIndex, 1);
        await student.save();

        book.copiesAvailable += 1;
        await book.save();

        res.status(200).json({ success: true, message: "Book returned successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error returning book", error });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching students", error });
    }
};      

export const getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching student", error });
    }
};

export const removeStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        await Student.findByIdAndDelete(studentId);
        res.status(200).json({ success: true, message: "Student removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error removing student", error });
    }
};


