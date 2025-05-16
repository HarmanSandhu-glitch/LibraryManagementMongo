import Student from "../models/studentModel.js";
import Book from "../models/bookModel.js";

// Borrow a book
export const borrowBook = async (req, res) => {
    try {
        const { studentId, bookId } = req.body;

        // Find the student and book
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

        // Add the book to the student's borrowed books
        student.booksBorrowed.push({ bookId });
        await student.save();

        // Decrease the available copies of the book
        book.copiesAvailable -= 1;
        await book.save();

        res.status(200).json({ success: true, message: "Book borrowed successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error borrowing book", error });
    }
};

// Return a book
export const returnBook = async (req, res) => {
    try {
        const { studentId, bookId } = req.body;

        // Find the student and book
        const student = await Student.findById(studentId);
        const book = await Book.findById(bookId);

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        // Check if the student has borrowed the book
        const borrowedBookIndex = student.booksBorrowed.findIndex(
            (borrowedBook) => borrowedBook.bookId.toString() === bookId
        );

        if (borrowedBookIndex === -1) {
            return res.status(400).json({ success: false, message: "Book not borrowed by the student" });
        }

        // Remove the book from the student's borrowed books
        student.booksBorrowed.splice(borrowedBookIndex, 1);
        await student.save();

        // Increase the available copies of the book
        book.copiesAvailable += 1;
        await book.save();

        res.status(200).json({ success: true, message: "Book returned successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error returning book", error });
    }
};