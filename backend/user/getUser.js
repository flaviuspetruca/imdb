const User = require('../schemas/user')
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {
    const token = JSON.parse(req.body.token)
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if(decodedToken.role === "admin"){
            User.findOne({ "username": req.params.username }, (err, data) => {
                if (data) {
                    res.status(200).send(data)
                } else {
                    res.status(404).send('User not found')
                }
            })
        } else{
            res.status(405).send("Not admin");
        }
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = getUser