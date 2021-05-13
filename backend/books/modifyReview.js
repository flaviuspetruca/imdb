const jwt = require('jsonwebtoken');
const Book = require('../schemas/book');
const getAverageRating = require('./getAverageRating');

const modifyReview = (req, res) => {
    if (req.body.title != '' && req.body.stars > 0) {
        const token = JSON.parse(req.body.token); // For front-end
        // const token = req.body.token;
        const bookId = req.body.bookId;

        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

            const reviewId = req.params.reviewId;

            Book.updateOne(
                { "reviews._id": reviewId }, 
                {
                    "$set": {
                        "reviews.$": {
                            "_id": reviewId,
                            "username": decodedToken.username,
                            "title": req.body.title,
                            "stars": req.body.stars,
                            "description": req.body.description,
                            "publishedAt": Date.now()
                        }
                    }
                }, 
                async(err, review) => {
                    if (!review)
                        return res.status(404).send("Review " + reviewId + " not found");
                    await getAverageRating(bookId.id, function(err, avg) {
                        Book.updateOne({ "_id": bookId.id }, { "averageRating": avg }, (err, book) => {
                            if (book) {
                                Book.findOne({ "_id": bookId.id }, (err, book) => {
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
                                return res.status(404).send("Book " + bookId + " not found");
                            }
                        })
                    });
            }
        )} catch(err) {
            res.status(401).send("Invalid token");
        }
    } else {
        res.status(400).send("Invalid input");
    }
};

module.exports = modifyReview;