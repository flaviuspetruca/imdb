const User = require('../schemas/user')
const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const reviewsOnDate = (req, res) => {
    const token = JSON.parse(req.body.token)
    // const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = req.params.userId
        if (decodedToken.role === 'admin') {
            User.findOne({ "_id": userId }, (err, user) => {
                if (user) {
                    let reviewIds = user.reviews.map(r => r.id)

                    // Get books with user's reviews
                    Book.find({"reviews._id": { "$in": reviewIds } }, (err, data) => {
                        // label, y array
                        let resultReviews = []

                        // Iterate through each book
                        for (let book of data) {
                            let dontPush = 0
                            let date
                            // Find the created by the user
                            for (let reviewIndex in book.reviews) {
                                if (book.reviews[reviewIndex].username == user.username) {
                                    date = book.reviews[reviewIndex].publishedAt.toLocaleDateString()
                                    for (let review of resultReviews) {
                                        if (review.label === date){
                                            dontPush = 1
                                        }
                                    }
                                }
                            }
                            if (!dontPush){
                                resultReviews.push({ 
                                    label: date
                                })
                            }
                            
                        }

                        for (let index in resultReviews) {
                            let counter = 0
                            let date = resultReviews[index].label
                            for (let book of data) {
                                for (let reviewIndex in book.reviews) {
                                    let reviewDate
                                    if (book.reviews[reviewIndex].username == user.username)
                                        reviewDate = book.reviews[reviewIndex].publishedAt.toLocaleDateString()

                                    if (date == reviewDate)
                                        counter++
                                }
                            }

                            resultReviews[index].y = counter;
                        }

                        console.log(resultReviews)

                        let dates = resultReviews;

                        const formatDate = (date) => {

                            var dd = date.getDate();
                            var mm = date.getMonth()+1;
                            if(dd<10) {dd='0'+dd}
                            if(mm<10) {mm='0'+mm}
                            date = mm+'/'+dd;
                            return date
                        }
                
                        const Last7Days = () => {
                            var result = [];
                            for (var i=0; i<7; i++) {
                                var d = new Date();
                                let ok = 0;
                                d.setDate(d.getDate() - i);
                                dates.map(date => {
                                    let splitdate = date.label.split('/')
                                    
                                    if(splitdate[0].length == 1) {
                                        date.label = "0" + splitdate[0]+ "/" + splitdate[1];
                                    }
                                    splitdate = date.label.split('/')
                                    if(splitdate[1].length == 1) {
                                        date.label = splitdate[0] + "/0" + splitdate[1];
                                    }
                                    if(formatDate(d) === date.label)
                                        {
                                            result.push({label: date.label, y: date.y})
                                            ok = 1;
                                        }   
                                }               
                                )
                                if(ok === 0){
                                    result.push({label: formatDate(d), y: 0})
                                }
                                
                            }
                            return result.reverse();
                        }

                        res.status(200).send(Last7Days());
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