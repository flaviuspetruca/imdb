import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {Dropdown} from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const Review = (props) => {

    const reviewInfo = props.content;
    const date = new Date(reviewInfo.publishedAt);
    const displayDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    const displayTime = date.getHours() + ":" + date.getMinutes();
    const [isVerrifed, setIsVerrified] = useState(false);
    
    const verify = () => {
        console.log(reviewInfo.username);
        console.log(props.username);
        if(props.isAdmin || props.isSupport || props.username === reviewInfo.username)
            {setIsVerrified(true);
                console.log("HERE:");
            }

    }

    useEffect(() => {verify()} , []);
    return (
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
                    <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
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
    </Card> );
}
 
export default Review;