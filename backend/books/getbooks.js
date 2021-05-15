const Book = require('../schemas/book');
const User = require('../schemas/user')
const jwt = require('jsonwebtoken');

const getbooks = (req, res) => {
    const token = JSON.parse(req.body.token);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        User.findOne({"username": decodedToken.username}, (err, data) => {
            if (data) {
                Book.find({}, (err, books) => {
                    if(books){
                        res.status(200).send(books);
                    }
                    else{
                        res.status(400).send(err);
                    }
                })
            } else {
                return res.status(404).send("User does not exist")
            }
        })
        
    }catch(err){
        res.status(401).send("Invalid token");
        console.log(err);
    }
}

module.exports = getbooks;