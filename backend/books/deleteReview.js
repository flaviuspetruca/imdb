const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const deleteReview = (req, res) => {
    const token = JSON.parse(req.body.token);
    const reviewId = req.params.reviewId;
    const bookId = req.body.book_id;
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Check user role
        if (decodedToken.role == 'user') {
            Book.updateOne({ }, { "$pull": { "reviews": { "_id": reviewId, "username": decodedToken.username } } }, (err, data) => {
                if (data.nModified > 0)
                    res.status(204).send(data);
                else
                    res.status(404).send('Review not found for user');
            });
        } else {
            Book.updateOne({ }, { "$pull": { "reviews": { "_id": reviewId } } }, (err, data) => {
                if (data.nModified > 0)
                    res.status(204).send(data);
                else
                    res.status(404).send('Review not found');
            });
        }

        
    } catch (err) {
        return res.status(401).send("Invalid token");
    }
}

module.exports = deleteReview;