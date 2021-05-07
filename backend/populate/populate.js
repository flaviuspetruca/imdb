const Books = require('../schemas/book');

const populate = (req, res) => {
    let body = req.body;
    console.log(body);
    for (const item of body) {
        let book = new Books(body);
        book.save().then().catch((error) => {
            console.log(error);
        });
    }

    
}

module.exports = populate;