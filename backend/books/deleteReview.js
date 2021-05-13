const Book = require('../schemas/book');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const getAverageRating = require('./getAverageRating');
const mongoose = require('mongoose')

const deleteReview = (req, res) => {
    const token = JSON.parse(req.body.token);
    const reviewId = req.params.reviewId;
    const bookId = req.body.bookId;
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Check user role`
        if (decodedToken.role == 'user') {
            Book.updateOne({ "reviews._id": reviewId }, { 
                "$pull": { "reviews": { "_id": reviewId, "username": decodedToken.username } },
                "$inc": { "reviewsCount": -1 }
            }, async(err, data) => {
                if (data) {
                    // Recalculate average rating of book
                    await getAverageRating(bookId.id, function(err, avg) {

                        Book.updateOne({ "_id": bookId.id }, { "averageRating": avg }, (err, book) => {
                            if (book) {
                                console.log('Updated book average rating');
                                const username = decodedToken.username
                                User.updateOne({ "username": username }, 
                                {
                                    "$inc": { "reviewCount": -1 },
                                    "$pull": { "reviews": { "id": mongoose.Types.ObjectId(reviewId) } }
                                },
                                (err, updatedUser) => {
                                    if (updatedUser.nModified > 0)
                                        res.status(204).send(updatedUser);
                                    else
                                        res.status(404).send("User not found");
                                });
                            }
                        });
                    });
                    // res.status(204).send(data);
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
                    await getAverageRating(bookId.id, function(err, avg) {
                        Book.updateOne({ "_id": bookId.id }, { "averageRating": avg }, (err, book) => {
                            console.log('Updated book average rating');
                            const username = req.body.username;
                            User.updateOne({ "username": username }, 
                            {
                                "$inc": { "reviewCount": -1 }
                            },
                            (err, updatedUser) => {
                                if (updatedUser.nModified > 0)
                                    res.status(204).send(updatedUser);
                                else
                                    res.status(404).send("User not found");
                            });
                        });
                    });
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