import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import Review from './Review';
import Modal from 'react-modal';
import ReactStars from "react-rating-stars-component";

const BookInfo = () => {

    const [book, setBook] = useState('');
    const [username, setUsername] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSupport, setIsSuport] = useState(false);
    const bookId = useParams();
    const token = localStorage.getItem('token');
    const data = {token, _id: bookId};

    const ratingChanged = (newRating) => {
        setRating(newRating);
    }

    const [added, setAdded] = useState('');
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const customStyles = {
        content : {
          color                 : 'white',
          border                : 'none',
          width                 : '400px',
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transition            : 'all 0.2s ease-in-out',
          transform             : 'translate(-50%, -50%)',
          overflow              : 'hidden',
          borderRadius          : '15px',
          backgroundColor       : '#2b2b2b',
        },
        overlay: {
          backgroundColor         : 'rgba(170, 170, 170, 0.4)',
          zIndex                  : '2000'
      },
    
      };
      const [modalIsOpen,setIsOpen] = useState(false);
      
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
          setAdded('');
      }

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
            setBook(res.book);
            setUsername(res.username);
        }
        else
            if(req.status === 201){
                const res = await req.json();
                setIsAdmin(true);
                setBook(res.book);
            }
            else
                if(req.status === 202){
                    const res = await req.json();
                    setIsSuport(true);
                    setBook(res.book);
                }
        else{
            setBook(false);
        }
    }

    const sendReview = async() => {
        if(rating === 0){
            setAdded(false);
            return;
        }
        if(title === '' || !title.trim().length){
            setAdded(false);
            return;
        }

        const data = {token, title, stars: rating, description};
        const req = await fetch(`http://localhost:3000/addreview/${book._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(req.status === 201){
            setAdded(true);
            document.location.reload();  
        }
        else
            if(req.status === 403){
                setAdded('ALREADY');
            }
        else{
            setAdded(false);
        }

    }

    const handleEdit = (value) => {  
        setAdded(value);
        if(value === true)
            document.location.reload();     
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sendReview();
    }

    useEffect(() => {
        loadbook();
    }, [added, token])

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
            <>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Add review</h2>
              <div className="form-group">
                <label className="create-label">Title</label>
                <input 
                    id="title"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAdded('');
                                    setTitle(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Description</label>
                <textarea
                    id="description"
                    rows="6" cols="50" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAdded('');
                                    setDescription(e.target.value);
                                  }
                              }
                />
              </div>
            <div className="row justify-content-center mb-3">
                <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={55}
                        activeColor="#ffd700"
                />
            </div>
            {
                added === false?
                <h5 className="text-center text-danger">Couldn't add review</h5>
                :
                added === true?
                <h5 className="text-center text-success">Added review!</h5>
                :
                added === "ALREADY"?
                <h5 className="text-center text-danger">You've already added a review!</h5>
                :
                <></>
            }
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-light mr-5 reviewCreate">Add review</button>
              <button onClick={closeModal} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
           </form>
        </Modal>
            
            <div className="book-wrapper">
                <div className="book-inner"> 
                    <div className="row">
                        <div className="col-sm-6">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    
                                    <h2>{book.title}</h2>
                                        <ReactStars
                                            value={book.averageRating}
                                            edit={false}
                                            count={5}
                                            size={30}
                                            isHalf="true"
                                            activeColor="#ffd700"
                                        />
                                    
                                    <img alt={book.title} src={book.thumbnail} className="bigThumbnail"></img>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-12">
                                    <a href={book.purchaseLink}  
                                        className="btn btn-light"
                                        rel="noreferrer"
                                        target="_blank"
                                    >Read/Buy from here</a>
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
                        <button className="btn btn-primary addReview" onClick={openModal}>Add review</button>
                        {
                            book.reviewsCount > 0 ?
                            book.reviews.slice(0).reverse().map(r => {
                                if(isAdmin)
                                    return (<Review 
                                                key={r._id} 
                                                bookId={bookId}
                                                token={token}
                                                loadbook={loadbook}
                                                handleEdit={handleEdit}
                                                content={r} 
                                                isAdmin={true}
                                                isSupport={false}
                                                username={false}
                                            ></Review>)
                                else
                                    if(isSupport)
                                        return (<Review 
                                                        key={r._id} 
                                                        bookId={bookId}
                                                        token={token}
                                                        loadbook={loadbook}
                                                        handleEdit={handleEdit}
                                                        content={r}
                                                        isAdmin={false}
                                                        isSupport={true}
                                                        username={false}        
                                                ></Review>)
                                    else
                                        if(username)
                                            return (<Review 
                                                            key={r._id}
                                                            bookId={bookId} 
                                                            token={token}
                                                            loadbook={loadbook}
                                                            handleEdit={handleEdit}
                                                            content={r}
                                                            isAdmin={false}
                                                            isSupport={false}
                                                            username={username}        
                                                    ></Review>)
                                        else
                                            loadbook();
                            })
                            :
                            <h6>There are no reviews. Be the first one?</h6>
                        }
                        </div>
                    </div>
            </div>
            </div>
        </>
        );
    else
        return(<NotFound/>)
}
 
export default BookInfo;