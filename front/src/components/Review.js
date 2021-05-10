import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-modal';
import {Dropdown} from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const Review = (props) => {

    const reviewInfo = props.content;
    const bookId = props.bookId;
    const token = props.token;
    const date = new Date(reviewInfo.publishedAt);
    const displayDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    const displayTime = date.getHours() + ":" + date.getMinutes();
    
    const inputStyle = "border: '1px !important', borderColor: '#ced4da !important'";
    const redinputStyle = "border: '1px !important', borderColor: 'red !important'";

    const [isVerrifed, setIsVerrified] = useState(false);
    const [rating, setRating] = useState(reviewInfo.stars);
    const [title, setTitle] = useState(reviewInfo.title);
    const [description, setDescription] = useState(reviewInfo.description);
    const [ratingInput, setRatingInput] = useState(true);
    const [titleInput, setTitleInput] = useState({inputStyle});
    const [descriptionInput, setDescriptionInput] = useState({inputStyle, resize: 'none'});

    const verify = () => {
        if(props.isAdmin || props.isSupport || props.username === reviewInfo.username)
            setIsVerrified(true);
    }

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const deleteReview = async() => {
        const data = {token, bookId};
        const req = await fetch(`http://localhost:3000/deleteReview/${reviewInfo._id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 204){
            props.loadbook();
        }
        else{
            console.log("COULDNT DELETE");
        }
    }

    const editReview = async() =>{
        if(rating === 0){
            setRatingInput(false);
            props.handleEdit(false);
            return;
        }
        if(title === '' || !title.trim().length){
            setTitleInput({redinputStyle})
            props.handleEdit(false);
            return;
        }
        
        console.log(rating);
        const data = {token, title, stars: rating, description, bookId};
        const req = await fetch(`http://localhost:3000/modify/${reviewInfo._id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 201){
            props.handleEdit(true);
        }
        else{
            props.handleEdit(false);
        }
    }

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
      const [modalIsOpen1,setIsOpen1] = useState(false);
      const [modalIsOpen2,setIsOpen2] = useState(false);
      
        function openModal1() {
            setIsOpen1(true);
        }
        
        function closeModal1(){
            setIsOpen1(false);
        }

        function openModal2() {
            setIsOpen2(true);
        }
        
        function closeModal2(){
            setIsOpen2(false);
            setTitle(reviewInfo.title);
            setDescription(reviewInfo.description);
            setRating(reviewInfo.stars);
        }

    const handleSubmit = (event) => {
        event.preventDefault();
        editReview();
    }

    useEffect(() => {verify()} , []);

    return (
    <>
    <Modal 
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <h5 className="text-center text-danger">Are you sure you want to delete your review?</h5>
        <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {deleteReview(); closeModal1()}}>Delete</button>
        <button onClick={closeModal1} className="btn btn-warning cancelLogout">Cancel</button>
    </Modal>
    <Modal 
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <form onSubmit={handleSubmit}>
              <h2 className="text-center">Edit review</h2>
              <div className="form-group">
                <label className="create-label">Title</label>
                <input 
                    id="title"
                    type="text" 
                    className="form-control form-control-create"
                    value={title} 
                    style={titleInput} 
                    onChange={e => {
                                    //props.handleEdit('');
                                    setTitleInput({borderColor: "#ced4da !important"});
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
                    value={description}
                    style={descriptionInput} 
                    onChange={e => {
                                    //props.handleEdit('');
                                    setDescriptionInput({borderColor: "#ced4da !important", resize: 'none'});
                                    setDescription(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="row justify-content-center mb-3">
                <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        value={rating}
                        size={55}
                        activeColor="#ffd700"
                />
            </div>
           
            <div className="row justify-content-center">
                <button type="submit" className="btn btn-light mr-5 reviewCreate">Edit</button>
                <button onClick={closeModal2} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
        </form>
    </Modal>

    <Card>
        <Card.Body>
        <Dropdown drop='left'>
            <Dropdown.Toggle variant="light" id="dropdown-basic" data-toggle="none" className="moreOptions"  bsPrefix="p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                </svg>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    isVerrifed ? 
                    <>
                    <Dropdown.Item onClick={openModal2}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={openModal1}>Delete</Dropdown.Item>
                    </>
                    :
                    <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
                }
            </Dropdown.Menu>
            </Dropdown>
            <Card.Title>
                {reviewInfo.title}
            </Card.Title>
            <ReactStars
                value={reviewInfo.stars}
                edit={false}
                count={5}
                size={24}
                activeColor="#ffd700"
            />
            <Card.Subtitle className="mt-2">
                @{reviewInfo.username}
            </Card.Subtitle>
            <Card.Text>
                {reviewInfo.description}
            </Card.Text>
            <Card.Text>Published on {displayDate} at {displayTime} </Card.Text>

        </Card.Body>
    </Card>
    </>
    );
}
 
export default Review;