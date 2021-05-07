const User = require('../schemas/user');
const jwt = require('jsonwebtoken');
const sendEmail = require('../mailer');
const Reset = require('../schemas/resetpassSchema')

const forgot = (req, res) => {
    const email = req.body.email;
    User.findOne({email}, (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            if(user){
                const token = jwt.sign({email}, process.env.TOKEN_SECRET, {
                    expiresIn: '24h',
                });
                let r = new Reset({token});
                r.save().then(() => {
                    const link = `http://localhost:3001/resetpass/${token}`;
                    sendEmail({
                        emailTo: email,
                        subject: "Reset password for IBDB",
                        html: `<a href=${link}>Click here to reset your password</a>`
                    });
                    res.status(200).send("Email sent");
                }).catch(err => res.status(400).send(err));
            }
        }
    })
}

module.exports = forgot;