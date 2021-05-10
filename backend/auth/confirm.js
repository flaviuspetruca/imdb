const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const RegisterInfo = require('../schemas/registerSchema');

const confirm = (req, res) => {
    const token = req.params.token;
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        RegisterInfo.findOneAndRemove({username: decodedToken.username}, (err, r) => {
            if(r){
                console.log(r);
                let user = new User({
                    username: r.username,
                    email: r.email,
                    password: r.password
                })

                user.save().then(() => res.status(200).send("Registered!"))
                .catch((err) => res.status(400).send(err));
            }
            else{
                res.status(401).send("Expired!");
            }
        })
    }catch(err){
        console.log(err);
        res.status(401).send("InvalidToken");
    }
}

module.exports = confirm;