import React, { useState, useEffect } from 'react';
import CanvasJSReact from '../canvasjs.react';

const UserChart = (props) => {

    const userId = props.userId;
    const token = localStorage.getItem('token');

    const [option, setOption] = useState(false);
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart; 


    useEffect(() => {
        const createChart = async() => {
            const data = {token};
            const req = await fetch(`http://localhost:3000/reviewsondate/${userId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(req.status === 200){
                const res = await req.json();
                setOption(res);
            }
            else
                setOption('');
        }
        
    createChart()}, [token, userId]);

    if(option === false){
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
    if(option && option.length > 0){
    return ( <CanvasJSChart options={{
        title: {
        text: "7 day review activity"
        },
        data: [{				
                type: "column",
                dataPoints: option
        }]
        }}
        />
    );
    }
    else{
        return (<>Not available</>)
    }
}
 
export default UserChart;