const Book = require('../schemas/book');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

const loadbook = (req, res) => {
    const bookId = req.body._id.id;
    const token = JSON.parse(req.body.token);
    try{
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const username = decodedToken.username;
        Book.findOne({_id: bookId}, (err, book) => {
            if(book){
                User.findOne({username}, (err, user) => {
                    if(user){
                        if(user.role === "admin" ){
                            res.status(201).send(book);
                        }
                        else
                            if(user.role === "support"){
                                res.status(202).send(book);
                            }
                            else{
                                const obj = [book, username]
                                res.status(200).send(obj);
                            }
                    }
                    else{
                        res.status(400).send("Not a user");
                    }
                })
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