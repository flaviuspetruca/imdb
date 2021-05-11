const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const loadbook = (req, res) => {
    const bookId = req.body._id.id;
    const token = JSON.parse(req.body.token);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const username = decodedToken.username;
        const role = decodedToken.role;
        Book.findOne({_id: bookId}, (err, book) => {
            if(book){
                if(role === 'admin'){
                    res.status(201).send({book});
                }
                else
                    if(role === 'support'){
                        res.status(202).send({book});
                    }
                    else{
                            res.status(200).send({book, username});
                        }
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