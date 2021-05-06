const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../mailer');
const User = require('../schemas/user');
const RegisterInfo = require('../schemas/registerSchema');

const register = (req, res) => {

    const username = req.body.username;
    const emailTo = req.body.email;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    User.findOne({username}, (err, user) => {
        if(!user){
            if(username.length < 6){
                res.status(400).send("Username is too short");
            }
            else
                if(password.length < 6){
                    res.status(406).send("Password too short");
                }
            else{
                User.findOne({email: emailTo}, (err, user) => {
                    if(user){
                        res.status(403).send("Email already exists!");
                    }
                    else{
                        const token = jwt.sign(
                                                {username, email:emailTo},
                                                process.env.TOKEN_SECRET,
                                                {expiresIn: 900}
                        );

                        RegisterInfo.findOne({username: username}, (err, r) => {
                            if(!r){
                                RegisterInfo.findOne({email: emailTo}, (err, r) => {
                                    if(!r){
                                        let reg = new RegisterInfo({
                                            username, 
                                            password, 
                                            email: emailTo, 
                                            token
                                        })
                                        const link = `http://localhost:3001/confirm/${token}`;
                                        reg.save().then(() => {
                                            sendEmail({
                                                emailTo,
                                                subject: "Confirm email for IBDB",
                                                html: `<a href=${link}>Click here</a>`
                                            })
                                            res.status(200).send("email sent");
                                        }).catch((err) => res.status(400).send(err))
                                    }
                                    else{
                                        res.status(401).send("Register mail already sent!");
                                    }
                                })
                            }
                            else{
                                res.status(401).send("Register mail already sent!");
                            }
                    
                        })
                    }
                })
            }   
        }
        else{
            res.status(401).send("User already exists!");
        }
    })
}

module.exports = register;
