const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const getOrderedBooks = (req, res) => {
    const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken.role === "admin") {
            Book.find({}, (err, data) => {
                data = data.map(({title, reviewsCount}) => ({title, reviewsCount}))
                res.status(200).send(data)
            }).sort({ "reviewsCount": -1 }).limit(parseInt(req.params.limit))
        }
    } catch(err) {
        console.log(err)
        return res.status(401).send("Invalid token")
    }
}

module.exports = getOrderedBooks