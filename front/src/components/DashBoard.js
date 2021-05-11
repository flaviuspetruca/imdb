import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const DashBoard = (logOut) => {

    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');
    const data = {token};

    const getbooks = async() => {
        const req = await fetch("http://localhost:3000/getbooks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
            const res = await req.json();
            setBooks(res);
        }
        else
            if(req.status === 401){
            logOut.logOut();
        }
    }
    useEffect(() => {
        getbooks();
    }, []);

    if(books.length === 0)
    return (
        <div className="container dashboard-container text-center">
            <h1 className="text-light">Loading books...&#128214;</h1>
            <div className="spinner-border spinner-border-xl text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
    else
        return (
        <div className="container dashboard-container">
            <h1 className="text-light mb-5">All books</h1>
            <div className="row">
            {
                books.map(b => <Link key={b._id} to={`/book/${b._id}`}><div  className="col-lg-2 mb-5">
                    
                    <img className="book" src={b.thumbnail}/>
                    </div>
                    </Link> )
            }
            </div>
        </div>
        );
}
 
export default DashBoard;