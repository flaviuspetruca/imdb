const User = require('../schemas/user')
const jwt = require('jsonwebtoken')

const islogged = (req, res) => {
    const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const username = decodedToken.username;
            User.findOne({ "username": username }, (err, data) => {
                if (data) {
                    res.status(200).send()
                } else {
                    res.status(401).send('User not found');
                }
            })
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = islogged;