import React, {useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

const Category = (logOut) => {

    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');
    let category = useParams().category;

    const getbooks = async() => {
        console.log(category);
        category = category.replace('&', '%26');
        const data = {token};
        const req = await fetch(`http://localhost:3000/categories?category=${category}`, {
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
    return ( 
    <div className="container dashboard-container">
            <h1 className="text-light mb-5">{category}</h1>
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
 
export default Category;