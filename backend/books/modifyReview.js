const jwt = require('jsonwebtoken');
const Book = require('../schemas/book');

const modifyReview = (req, res) => {
    // const token = JSON.parse(req.body.token); // For front-end
    const token = req.body.token;

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);

        const reviewId = req.params.reviewId;

        Book.updateOne(
            { "reviews._id": reviewId }, 
            {
                "reviews.$": {
                    "title": req.body.title,
                    "stars": req.body.stars,
                    "description": req.body.description,
                    "publishedAt": Date.now()
                }
            }, 
            (err, book) => {
                if (book)
                {
                    console.log(book);
                    res.status(200).send("Updated");
                } else {
                    res.status(404).send("Review " + reviewId + " not found");
                }
            }
        )
    } catch(err) {
        res.status(401).send("Invalid token");
    }
};

module.exports = modifyReview;