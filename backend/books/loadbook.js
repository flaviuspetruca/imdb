const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');

const loadbook = (req, res) => {
    const bookId = req.body._id.id;
    const token = JSON.parse(req.body.token);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        Book.findOne({_id: bookId}, (err, book) => {
            if(book){
                res.status(200).send(book);
            }
            else{
                res.status(404).send("Not Found");
            }
        })
    }catch(err){
        res.status(400).send("Invalid token");
    }
}

module.exports = loadbook;