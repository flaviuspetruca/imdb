import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import Review from './Review';
const BookInfo = () => {

    const [book, setBook] = useState('');
    const [date, setDate] = useState('');
    const bookId = useParams();
    const token = localStorage.getItem('token');
    const data = {token, _id: bookId};
    const loadbook = async() => {
        const req = await fetch(`http://localhost:3000/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
            const res = await req.json();
            setBook(res);
            console.log(res);
        }
        else{
            setBook(false);
        }
    }

    useEffect(() => {
        loadbook();
    }, [])

    if(book === '')
        return(
            <div className="container dashboard-container text-center">
            <h1 className="text-light">Loading book...&#128214;</h1>
            <div className="spinner-border spinner-border-xl text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        );
    else
        if(book !== false)
        return (
            <div className="book-wrapper">
                <div className="book-inner"> 
                    <div className="row">
                        <div className="col-sm-6">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h2>{book.title}</h2>
                                    <img src={book.thumbnail} className="bigThumbnail"></img>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <a href={book.purchaseLink} 
                                        className="btn btn-light"
                                        target="_blank"
                                    >Buy from here</a>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="row mt-5">
                                <div className="col-sm-12">
                                    <h4>Genre</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                {
                                    book.categories.map(c =>
                                        <p>{c}</p>
                                    )
                                }
                                </div>
                            </div>
                            <div className="row mt-2 review">
                                <div className="col-sm-12 mt-3">
                                    <h2>Description</h2>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className="row mt-2 review">
                                <div className="col-sm-12 mt-3">
                                    <h5 className="mt-3">Authors</h5>
                                    <p>{book.authors.map( a => `${a}, ` )}</p>
                                    <h5>Published On: </h5>
                                    <p>{book.publishedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row review">
                        <div className="col-sm-12 mt-3">
                        <h5>Reviews</h5>
                        <button className="btn btn-primary addReview">Add review</button>
                        {
                            book.reviewsCount > 0 ?
                            book.reviews.map(r => <Review key={r._id} content={r}></Review>)
                            :
                            <h6>There are no reviews. Be the first one?</h6>
                        }
                        </div>
                    </div>
            </div>
            </div>
        );
    else
        return(<NotFound/>)
}
 
export default BookInfo;