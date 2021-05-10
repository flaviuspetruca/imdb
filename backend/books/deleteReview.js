const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');
const getAverageRating = require('./getAverageRating');

const deleteReview = (req, res) => {
    const token = JSON.parse(req.body.token);
    const reviewId = req.params.reviewId;
    const bookId = req.body.bookId;
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Check user role
        if (decodedToken.role == 'user') {
            Book.updateOne({ "reviews._id": reviewId }, { 
                "$pull": { "reviews": { "_id": reviewId, "username": decodedToken.username } },
                "$inc": { "reviewsCount": -1 }
            }, async(err, data) => {
                if (data.nModified > 0) {
                    // Recalculate average rating of book
                    await getAverageRating(bookId, function(err, avg) {
                        Book.updateOne({ "_id": bookId }, { "averageRating": avg }, (err, book) => {
                            console.log('Updated book average rating');
                        });
                    });
                    res.status(204).send(data);
                } else {
                    res.status(404).send('Review not found for user');
                }
            });
        } else {
            Book.updateOne({ "reviews._id": reviewId }, { 
                "$pull": { "reviews": { "_id": reviewId } }, 
                "$inc": { "reviewsCount": -1 }
            }, async(err, data) => {
                if (data.nModified > 0) {
                    // Recalculate average rating of book
                    await getAverageRating(bookId, function(err, avg) {
                        Book.updateOne({ "_id": bookId }, { "averageRating": avg }, (err, book) => {
                            console.log('Updated book average rating');
                        });
                    });
                    res.status(204).send(data);
                } else {
                    res.status(404).send('Review not found');
                }
            });
        }

        
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
}

module.exports = deleteReview;