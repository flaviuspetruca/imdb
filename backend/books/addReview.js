const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const addReview = (req, res) => {
    // const token = JSON.parse(req.body.token);
    try {
        // jwt.verify(token, process.env.TOKEN_SECRET);
        const id = req.params;
        Book.findOne({ "_id": ObjectId(id) }).then( (err, book) => {
            console.log(book);
            const averageRating = (book.averageRating + req.body.stars) / (book.reviewsCount + 1);

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
                }
            ).then(() => {console.log("done")});
        }
    )
    } catch (err) {
        console.log(err);
    }
};

module.exports = addReview;