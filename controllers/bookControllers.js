import Book from '../models/bookModel.js';

// Get all books
export const getAllBooks = async () => {
    try {
        console.log("get all books");
        const books = await Book.find();
        return { success: true, data: books };
    } catch (error) {
        return { success: false, message: 'Error fetching books', error };
    }
};

export const getBookById = async (req, res) => {
    console.log("get book by id");
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching book', error });
    }
};

// Create a new book
export const createBook = async (req, res) => {
    console.log("create new Book");
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json({ success: true, data: savedBook });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating book', error });
    }
};

// Update a book by ID
export const updateBook = async (req, res) => {
    console.log("update book");
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: updatedBook });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating book', error });
    }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
    console.log("delete");
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting book', error });
    }
};
