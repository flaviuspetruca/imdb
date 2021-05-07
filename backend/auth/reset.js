const Reset = require('../schemas/resetpassSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../schemas/user");

const reset = (req, res) => {
    const token = req.body.token;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const email = decodedToken.email;
        const updateDocument = {$set: {password}};
        Reset.findOneAndRemove({token}, (err, r) => {
            if(r){
                User.updateOne({email}, updateDocument)
                .then(() => res.status(200).send("Updated"))
                .catch(err => res.status(400).send(err))
            }
            else{
                res.status(400).send(err);
            }
        })
    }catch(err){res.status(400).send(err)}
}

module.exports = reset;