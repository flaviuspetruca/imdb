import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import Review from './Review';
const BookInfo = () => {

    const [book, setBook] = useState('');
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
            <div className="spinner-border spinner-border-xl" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        );
    else
        if(book !== false)
        return (
            <div className="book-wrapper">
                <div className="book-inner"> 
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>{book.title}</h2>
                            <img src={book.thumbnail} className="bigThumbnail"></img>
                            <h5 className="mt-3">Authors</h5>
                            {book.authors.map( a => <p>{a}</p> )}
                            <h5>Published On: </h5>
                            <p>{book.publishedDate}</p>
                        </div>
                        <div className="col-sm-6">
                            <div className="row">
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
                            <div className="row mt-5">
                                <div className="col-sm-12">
                                    <h2>Description</h2>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <a  href={book.purchaseLink} 
                                        className="btn btn-light"
                                        target="_blank"
                                    >Buy from here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-12">
                        <h5>Reviews</h5>
                        {
                            book.reviewsCount > 0 ?
                            book.review.map(r => <Review key={r._id} content={r}></Review>)
                            :
                            <>
                            <button className="btn btn-primary addReview">Add review</button>
                            <h6>There are no reviews. Be the first one?</h6>
                            </>
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