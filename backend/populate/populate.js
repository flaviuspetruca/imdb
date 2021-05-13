const Books = require('../schemas/book');

const populate = (req, res) => {
    let body = req.body;
    for (item of body) {
        let book = new Books({
            title: item.volumeInfo.title,
            subtitle: item.volumeInfo.subtitle,
            authors: item.volumeInfo.authors,
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            categories: item.volumeInfo.categories,
            ...(item.volumeInfo.imageLinks && { thumbnail: item.volumeInfo.imageLinks.thumbnail }),
            description: item.volumeInfo.description,
            purchaseLink: item.volumeInfo.infoLink
        });

        console.log(book);

        book.save();
    }
}

module.exports = populate;