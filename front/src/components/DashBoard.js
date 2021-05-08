import React, {useState, useEffect} from 'react';

const DashBoard = (logOut) => {

    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('token');
    const data = {token};

    const getbooks = async() => {
        const req = await fetch("http://localhost:3000/books", {
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

    if(books.length > 0)
    return (
        <div className="container dashboard-container">
            <div className="row">
            {
                books.map(b => <div ket={b._id} className="col-lg-2 mb-5"><img className="book" src={b.thumbnail}/></div> )
            }
            </div>
        </div>
    );
    else
        return (<h1 className="text-success">WHTAS</h1>);
}
 
export default DashBoard;