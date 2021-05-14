import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
import NotFound from './NotFound';

const BooksChart = () => {

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const token = localStorage.getItem('token');
    const [orderedBooks, setOrderedBooks] = useState(false);

    useEffect(() => {
    const getorderedbooks = async() => {
        const data = {token};
        const req = await fetch(`http://localhost:3000/orderedbooks/6`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
            const res = await req.json();
            console.log(res);
            setOrderedBooks(res);
        }
        else{
            setOrderedBooks('');
        }
    }

    getorderedbooks();
    }, [token])

    if(orderedBooks === false){
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
        if(orderedBooks && orderedBooks.length > 0){
            return (
                <div className="row justify-content-center pt-5">
                    <CanvasJSChart options={{
                        title: {
                        text: "Book Reviews"
                        },
                        data: [{				
                                type: "pie",
                                dataPoints: orderedBooks
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

export default BooksChart;