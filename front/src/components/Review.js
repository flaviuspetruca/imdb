import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactStars from "react-rating-stars-component";

const Review = (props) => {

    const reviewInfo = props.content;
    const date = new Date(reviewInfo.publishedAt);
    const displayDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    const displayTime = date.getHours() + ":" + date.getMinutes();

    return (
    <Card>
        <Card.Body>
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