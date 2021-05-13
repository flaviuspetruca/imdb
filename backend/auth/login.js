const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, function(err, user) {
        if(err) {
            res.status(405).send("user/pass wrong");
        }
        else
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result == true) {
                        const token = jwt.sign( {username: username, role: user.role} , process.env.TOKEN_SECRET,{
                            expiresIn: '24h',
                        });
                        user.password = null;
                        
                        res.status(200).send({token});
                    }
                    else {
                        res.status(405).send("user/pass wrong");
                    }
            })
        }
        else
            res.status(405).send("user/pass wrong");
    });
}

module.exports = login;