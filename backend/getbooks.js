const Book = require('./schemas/book');
const jwt = require('jsonwebtoken');

const getbooks = (req, res) => {
    const token = JSON.parse(req.body.token);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        Book.find({}, (err, books) => {
            if(books){
                res.status(200).send(books);
            }
            else{
                res.status(400).send(err);
            }
        })
    }catch(err){
        res.status(401).send("Invalid token");
        console.log(err);
    }
}

module.exports = getbooks;