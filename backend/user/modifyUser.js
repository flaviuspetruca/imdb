const jwt = require('jsonwebtoken')
const User = require('../schemas/user')

const modifyUser = (req, res) => {
    const token = JSON.parse(req.body.token)
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        console.log(req.body)

        if (decodedToken.role === 'admin') {
            const userId = req.params.userId
            if (req.body.username) {
                User.findOne({ "_id": userId }, (err, data) => {
                    if (data)
                        res.status(403).send("Username already in use")
                    else {
                        User.updateOne(
                            { "_id": userId },
                            {
                                "$set": {
                                    // Only fields given in body will be sent
                                    ...(req.body.username) && { "username": req.body.username },
                                    ...(req.body.role) && { "role": req.body.role },
                                    ...(req.body.email) && { "email": req.body.email },
                                }
                            },
                            (err, updateData) => {
                                if (updateData.nModified > 0) {
                                    res.status(201).send(updateData)
                                } else {
                                    res.status(404).send('User not found')
                                }
                            }
                        )
                    }
                })
            }
        } else {
            res.status(403).send("Unauthorized: role 'user' cannot modify other users")
        }
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = modifyUser