const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const addReview = (req, res) => {
    const token = req.body.token;
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        const id = req.params.bookId;

        Book.findOne({ "_id": id }, (err, book) => {
            if (book) {
                // Check if user already created a review
                for (review of book.reviews)
                {
                    if (review.username == req.body.username)
                        return res.status(403).send("Already created a review");
                }

                console.log(book);
                const averageRating = (book.averageRating * book.reviewsCount + req.body.stars) / (book.reviewsCount + 1);
                console.log(averageRating);
                console.log(typeof(req.body.description));

                Book.updateOne(
                    { "_id": id },
                    { 
                        "$push": { 
                        "reviews": {
                            // TODO
                            "username": req.body.username,
                            "stars": req.body.stars,
                            "title": req.body.title,
                            "description": req.body.description,
                            "publishedAt": Date.now() 
                            }
                        },
                        "$inc": {
                            "reviewsCount": 1
                        },
                        "averageRating": averageRating
                    },
                    (err, book) => {
                        res.status(201).send(book);
                    }
                );
            } else {
                res.status(404).send("Book " + id + " not found");
            }
        }
    )
    } catch (err) {
        res.status.status(401).send("Invalid token");
    }
};

module.exports = addReview;