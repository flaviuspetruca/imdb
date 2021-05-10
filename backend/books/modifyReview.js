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

                    await getAverageRating(bookId, function(err, avg) {
                        Book.updateOne({ "_id": bookId }, { "averageRating": avg }, (err, book) => {
                            if (book) {
                                return res.status(201).send(book);
                            } else {
                                return res.status(404).send("Book " + bookId + " not found");
                            }
                        })
                    });
                }
            );

            
        /* res.status(201).send("OK"); */
        } catch(err) {
            res.status(401).send("Invalid token");
        }
    } else {
        res.status(400).send("Invalid input");
    }
};

module.exports = modifyReview;