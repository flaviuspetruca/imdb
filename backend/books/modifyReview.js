const jwt = require('jsonwebtoken');
const Book = require('../schemas/book');
const getAverageRating = require('./getAverageRating');

const modifyReview = (req, res) => {
    const token = JSON.parse(req.body.token); // For front-end
    // const token = req.body.token;
    console.log(token);
    const bookId = req.body.book_id;

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
                            res.status(201).send(book);
                        } else {
                            res.status(404).send("Book " + bookId + " not found");
                        }
                    })
                });
            }
        );

        

    } catch(err) {
        res.status(401).send("Invalid token");
    }
};

module.exports = modifyReview;