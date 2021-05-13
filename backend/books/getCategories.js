const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

// Gets an array of all distinct categories
const getCategories = (req, res) => {
    const token = JSON.parse(req.body.token);
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        Book.distinct("categories", (err, data) => {
            if (data) {
                if(decodedToken.role === 'admin')
                    res.status(201).send(data);
                else
                    res.status(200).send(data);
            } else {
                res.statis(404).send("Categories not found");
            }
        })
    } catch (err) {
        res.status(401).send("Invalid token");
    }
}

module.exports = getCategories;