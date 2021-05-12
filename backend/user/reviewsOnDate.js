const User = require('../schemas/user')
const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const reviewsOnDate = (req, res) => {
    const token = JSON.parse(req.body.token);
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = req.params.userId
        if (decodedToken.role === 'admin') {
            User.findOne({ "_id": userId }, (err, user) => {
                if (user) {
                    let reviewIds = user.reviews.map(r => r.id)

                    Book.find({"reviews._id": { "$in": reviewIds } }, (err, data) => {
                        let resultReviews = []

                        for (let book of data) {
                            let date = book.reviews[0].publishedAt.toLocaleDateString()
                            let dontPush = 0

                            for (let review of resultReviews) {
                                if (review.date === date)
                                    dontPush = 1
                            }

                            if (!dontPush)
                                resultReviews.push({ 
                                    date: date
                                })
                        }

                        for (let index in resultReviews) {
                            let counter = 0
                            let date = resultReviews[index].date

                            for (let book of data) {
                                let reviewDate = book.reviews[0].publishedAt.toLocaleDateString()
                                if (date == reviewDate)
                                    counter++
                            }

                            resultReviews[index].reviewsCount = counter;
                        }

                        res.status(200).send(resultReviews);
                    })

                }
            })
        } else {
            res.status(403).send("Admin only")
        }
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = reviewsOnDate