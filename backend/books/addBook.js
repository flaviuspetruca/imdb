const Book = require('../schemas/book')
const jwt = require('jsonwebtoken')

const addBook = (req, res) => {
    const token = JSON.parse(req.body.token);
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedToken.role === 'admin') {
            if (
                req.body.authors.length > 0 && req.body.categories.length > 0 && 
                req.body.title !== '' && req.body.publisher !== '' &&
                req.body.publishedDate !== '' && req.body.thumbnail !== '' &&
                req.body.description !== '' && req.body.purchaseLink !== ''
                ) {
                let newBook = new Book({
                    "authors": req.body.authors,
                    "categories": req.body.categories,
                    "title": req.body.title,
                    "publisher": req.body.publisher,
                    "publishedDate": req.body.publishedDate,
                    "thumbnailPath": req.file.path.toString(),
                    "thumbnail": `http://localhost:3000/images/`+ req.file.originalname,
                    "description": req.body.description,
                    "purchaseLink": req.body.purchaseLink
                })

                newBook.save(newBook, (err, data) => {
                    if (data)
                        res.status(201).send(data)
                    else
                        res.status(409).send(err)
                })
            } else {
                res.status(400).send("Invalid input")
            }
        } else {
            res.status(403).send("Unauthorized: cannot add book")
        }
    } catch(err) {
        console.log(err)
        res.status(401).send("Invalid token")
    }
}

module.exports = addBook