const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const addReview = (req, res) => {
    // const token = JSON.parse(req.body.token);
    try {
        // jwt.verify(token, process.env.TOKEN_SECRET);
        const id = req.params.bookId;

        Book.findOne({ "_id": id }, (err, book) => {
            // console.log(book);
            const averageRating = (book.averageRating + req.body.stars) / (book.reviewsCount + 1);
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
                    console.log(book);
                }
            );
        }
    )
    } catch (err) {
        console.log(err);
    }
};

module.exports = addReview;