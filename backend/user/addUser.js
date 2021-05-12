const User = require('../schemas/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const addUser = (req, res) => {
    const token = JSON.parse(req.body.token);
    // const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken.role === "admin") {
            const salt = bcrypt.genSaltSync(10)
            const password = bcrypt.hashSync(req.body.password, salt)

            let newUser = new User({
                "username": req.body.username,
                "email": req.body.email,
                "password": password,
                "role": req.body.role
            })

            newUser.save(newUser, (err, user) => {
                if (user) {
                    res.status(201).send(user)
                } else {
                    res.status(409).send(err)
                }
            })
        } else {
            res.status(403).send("Unauthorized: role 'user' cannot add other users");
        }
    } catch(err) {
        console.log(err);
        res.status(401).send("Invalid token")
    }
}

module.exports = addUser