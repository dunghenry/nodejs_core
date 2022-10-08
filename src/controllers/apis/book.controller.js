const Book = require('../../models/book.model');
const client = require('../../configs/connect.redis');
const mongoose = require('mongoose');
const bookController = {
    getBooks: async (req, res) => {
        try {
            const books = await Book.find({});
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createBook: async (req, res) => {
        const { title, desc, page } = req.body;
        try {
            const book = await Book.findOne({ title });
            if (book) {
                return res
                    .status(400)
                    .json({ message: 'Title is already in use' });
            } else {
                const newBook = new Book({
                    title,
                    desc,
                    page,
                });
                const savedBook = await newBook.save();
                return res.status(200).json(savedBook);
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getBook: async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            } else {
                return res.status(200).json(book);
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    updateBook: async (req, res) => {
        const { id } = req.params;
        const { title, desc, page } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            } else {
                const findBook = await Book.findOne({ title });
                if (findBook) {
                    return res
                        .status(400)
                        .json({ message: 'Title is already in use' });
                } else {
                    const rs = await Book.findByIdAndUpdate(
                        { _id: id },
                        { title: title, desc: desc, page: page },
                        { new: true },
                    );
                    return res.status(200).json(rs);
                }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    deleteBook: async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }
        try {
            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            } else {
                const rs = await Book.deleteOne({ _id: id });
                if (rs.deletedCount == 1) {
                    return res
                        .status(200)
                        .json({ message: 'Deleted book successfully' });
                } else {
                    return res
                        .status(200)
                        .json({ message: 'Deleted book failed' });
                }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = bookController;
