const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const ratingArray = (req, res) => {
    const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken.role === 'admin') {
            Book.find({}, (err, books) => {
                if (books) {
                    let ratings = []
                    for (let index = 1; index <= 5; index++) {
                        ratings.push({
                            rating: index,
                            count: 0
                        })
                    }
                    for (let book of books) {
                        if (book.averageRating > 0) {
                            let rating = Math.round(book.averageRating)
                            let count = ratings[rating-1].count + 1

                            ratings[rating-1] = {
                                rating: rating,
                                count: count
                            }
                        }
                    }
                    
                    res.status(200).send(ratings)
                } else {
                    res.status(404).send('Books not found')
                }
            })
        }
    } catch(err) {
        console.log(err)
        res.status(401).send('Invalid token')
    }
}

module.exports = ratingArray