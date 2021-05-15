import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
import NotFound from './NotFound';

const RatingsChart = () => {

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const token = localStorage.getItem('token');
    const [ratings, setRatings] = useState(false);

    useEffect(() => {
        const getratings = async() => {
            const data = {token};
            const req = await fetch(`http://localhost:3000/ratingarray`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(req.status === 200){
                const res = await req.json();
                setRatings(res);
            }
            else{
                setRatings('');
            }
        }

        getratings();
    }, [token])

    if(ratings === false){
        return (
        <div className="container dashboard-container text-center">
            <h1 className="text-light">Loading chart...</h1>
            <div className="spinner-border spinner-border-xl text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )
    }
    else
    if(ratings && ratings.length > 0){
    return ( 
        <div className="row justify-content-center mb-5">
            <CanvasJSChart options={{
                title: {
                text: "Ratings"
                },
                data: [{				
                        type: "pie",
                        dataPoints: ratings
                }]
                }}
            />
        </div>      
        );
    }
    else{
        return (<NotFound/>)
    }
}
 
export default RatingsChart;