const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: String,
    subtitle: String,
    authors: [],
    publisher: String,
    publishedDate: String,
    categories: [],
    thumbnail: String,
    ratingAverage: Number,
    reviewsCount: { type: Number, default: 0 },
    reviews: [
        {
            username: String,
            stars: Number,
            title: String,
            descirption: { type: String, default: '' },
            publishedAt: Date
        }
    ]
})

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
