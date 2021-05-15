const Book = require('../schemas/book');
const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const getAverageRating = require('./getAverageRating');

const addReview = (req, res) => {
    if (req.body.title != '' && req.body.stars > 0) {
        const token = JSON.parse(req.body.token);
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const id = req.params.bookId;

            Book.findOne({ "_id": id }, (err, book) => {
                if (book) {
                    // Check if user already created a review
                    for (review of book.reviews)
                    {
                        if (review.username === decodedToken.username)
                            return res.status(403).send("Already created a review");
                    }

                    const curDate = Date.now()
                    Book.updateOne(
                        { "_id": id },
                        { 
                            "$push": { 
                            "reviews": {
                                "username": decodedToken.username,
                                "stars": req.body.stars,
                                "title": req.body.title,
                                "description": req.body.description,
                                "publishedAt": curDate
                                }
                            },
                            "$inc": {
                                "reviewsCount": 1
                            }
                        },
                        async(err, book) => {
                            if (book) {
                                await getAverageRating(id, function(err, avg) {
                                    Book.updateOne({ "_id": id }, { "averageRating": avg }, (err, book) => {
                                        if (book) {
                                            const username = decodedToken.username;

                                            Book.findOne({ "_id": id }, (err, book) => {
                                                if (book) {
                                                    let reviewId
                                                    for (let review of book.reviews) {
                                                        if (review.username == username)
                                                            reviewId = review._id
                                                    }

                                                    User.updateOne({ "username": username }, 
                                                    {
                                                        "$inc" : { "reviewCount": 1 },
                                                        "$push": { "reviews": { "id": reviewId } }
                                                    },
                                                    (err, userUpdated) => {
                                                        if (userUpdated)
                                                            res.status(201).send(userUpdated);
                                                        else
                                                            res.status(404).send("User not found");
                                                    });
                                                } else {
                                                    res.status(404).send("Book " + id + " not found");
                                                }
                                            })
                                        } else {
                                            res.status(404).send("Book " + id + " not found");
                                        }
                                    })
                                });
                            }
                        }
                    );
                } else {
                    res.status(404).send("Book " + id + " not found");
                }
            }
        )} catch (err) {
            res.status(401).send("Invalid token");
        }
    } else {
        res.status(400).send("Invalid input");
    }
};

module.exports = addReview;