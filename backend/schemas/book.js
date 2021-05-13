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
    thumbnailPath: String,
    description: String,
    averageRating: { type: Number, default: 0},
    reviewsCount: { type: Number, default: 0 },
    reviews: [
        {
            username: String,
            stars: Number,
            title: String,
            description: { type: String, default: '' },
            publishedAt: Date
        }
    ],
    purchaseLink: String
})

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
