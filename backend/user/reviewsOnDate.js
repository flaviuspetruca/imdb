const User = require('../schemas/user')
const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const reviewsOnDate = (req, res) => {
    const token = JSON.parse(req.body.token)
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
                                if (review.label === date)
                                    dontPush = 1
                            }

                            if (!dontPush)
                                resultReviews.push({ 
                                    label: date
                                })
                        }

                        for (let index in resultReviews) {
                            let counter = 0
                            let date = resultReviews[index].label

                            for (let book of data) {
                                let reviewDate = book.reviews[0].publishedAt.toLocaleDateString()
                                if (date == reviewDate)
                                    counter++
                            }

                            resultReviews[index].y = counter;
                        }

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