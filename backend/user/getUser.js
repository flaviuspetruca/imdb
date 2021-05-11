const User = require('../schemas/user')
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {
    const token = JSON.parse(req.body.token)
    try {
        jwt.verify(token, process.env.TOKEN_SECRET)
        User.findOne({ "_id": req.params.userId }, (err, data) => {
            if (data) {
                res.status(200).send(data)
            } else {
                res.status(404).send('User not found')
            }
        })
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = getUser