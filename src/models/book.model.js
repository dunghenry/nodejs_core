const { model, Schema } = require('mongoose');
const bookSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
            unique: true,
        },
        desc: {
            type: String,
            require: true,
        },
        page: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

const Book = model('Book', bookSchema);
module.exports = Book;
