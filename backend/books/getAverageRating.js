const Book = require('../schemas/book');

const getAverageRating = async(bookId, callback) => {
    let avg = 0;

    Book.findOne({ "_id": bookId }, (err, book) => {
        if (book) {
            if (book.reviewsCount > 0) {
                for (review of book.reviews) {
                    avg += review.stars;
                }
                
                avg = avg / book.reviewsCount;
            }
            callback(null, avg);
        } else {
            return err;
        }
    });
}

module.exports = getAverageRating;