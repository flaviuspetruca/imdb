const User = require('../schemas/user')
const jwt = require('jsonwebtoken')

const deleteUser = (req, res) => {
    const token = JSON.parse(req.body.token)
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken.role === 'admin') {
            const userId = req.params.userId
            User.deleteOne({ "_id": userId }, (err, data) => {
                if (data) {
                    res.status(204).send()
                } else {
                    res.status(404).send('User not found')
                }
            })
        } else {
            res.status(403).send("Unauthorized role");
        }
    } catch(err) {
        console.log(err);
        res.status(401).send("Invalid token")
    }
}

module.exports = deleteUser