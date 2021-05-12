import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Users = () => {

    const token = localStorage.getItem('token');

    const [isAdmin, setIsAdmin] = useState('');
    const [users, setUsers] = useState('');

    const getusers = async() => {
        const data = {token};
        const req = await fetch(`http://localhost:3000/getusers`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
            setIsAdmin(true);
            const res = await req.json();
            setUsers(res);
        }
        else{
            setIsAdmin(false);
        }
    }

    useEffect(() => {getusers()}, []);
    return ( <>
        {   isAdmin === true && users.length > 0?
            <div className="book-wrapper">
            <div className="book-inner">
                <h1>Users</h1>
                {users.map(u => 
                        <Card>
                            <Card.Body>
                                <Card.Title>{u.username}</Card.Title>
                                <Link to={`/user/${u.username}`}>
                                    <button className="btn btn-light moreUser">More</button>
                                </Link>
                            </Card.Body>
                        </Card>
                    )
                }
                </div>
            </div>
            :
            isAdmin === '' ?
            <>
                <h1 className="text-light">Loading book...&#128214;</h1>
                <div className="spinner-border spinner-border-xl text-light" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </>
            :
            <NotFound/>
        }
        </>
    );
}
 
export default Users;