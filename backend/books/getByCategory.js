const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const category = (req, res) => {
    const token = JSON.parse(req.body.token);
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        let categories = req.query.category.split(',');
        console.log(categories)

        Book.find({ categories: { $in: categories } }, function(err, books) {
            if (books) {
                res.status(200).send(books);
            } else {
                res.status(400).send(err);
            }
        });
    } catch (err) {
        res.status(401).send("Invalid token");
    }
}

module.exports = category;