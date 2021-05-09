import React from 'react';
import Card from 'react-bootstrap/Card';

const Review = (props) => {
    const reviewInfo = props.content;
    const date = new Date(reviewInfo.publishedAt);
    const displayDate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    const displayTime = date.getHours() + ":" + date.getMinutes();
    console.log(reviewInfo);
    return ( 
    <Card>
        <Card.Body>
            <Card.Title>
                {reviewInfo.title}
            </Card.Title>
            <Card.Subtitle>
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