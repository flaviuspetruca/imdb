import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';


const Users = () => {

    const token = localStorage.getItem('token');

    const [isAdmin, setIsAdmin] = useState('');
    const [users, setUsers] = useState('');
    const [added, setAdded] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Select role');
    const [email, setEmail] = useState('');
    const roles = ['admin', 'support', 'user'];

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

    const adduser = async() => {
        const data = {token, username, password, role, email};
        const req = await fetch(`http://localhost:3000/adduser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 201){
            setAdded(true);
            setTimeout(() => {
                closeModal();
            }, 1000);
        }else{
            setAdded(false);
        }
    }

    const customStyles = {
        content : {
          color                 : 'white',
          border                : 'none',
          width                 : '400px',
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transition            : 'all 0.2s ease-in-out',
          transform             : 'translate(-50%, -50%)',
          overflow              : 'hidden',
          borderRadius          : '15px',
          backgroundColor       : '#2b2b2b',
        },
        overlay: {
          backgroundColor         : 'rgba(170, 170, 170, 0.4)',
          zIndex                  : '2000'
      },
    
      };
      const [modalIsOpen,setIsOpen] = useState(false);
      
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
          setAdded('');
      }
      const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {getusers()}, [added]);

    return ( <>
        <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Add user</h2>
              <div className="form-group">
                <label className="create-label">Username</label>
                <input 
                    id="username"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAdded('');
                                    setUsername(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
                <label className="create-label">Email</label>
                <input 
                    id="email"
                    type="email" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAdded('');
                                    setEmail(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Password</label>
                <input 
                    id="password"
                    type="password" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAdded('');
                                    setPassword(e.target.value);
                                  }
                              }
                />
              </div>
                
                <DropdownButton title={role} className="mb-3" drop="up">
                    {roles.map((r, index) => 
                        <DropdownItem
                            key={index} 
                            onClick={() => setRole(r)}
                        >
                        {r}
                        </DropdownItem>)
                    }
                </DropdownButton>
                
            {
                added === false?
                <h5 className="text-center text-danger">Couldn't add user</h5>
                :
                added === true?
                <h5 className="text-center text-success">Added user!</h5>
                :
                <></>
            }
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-light mr-5 reviewCreate" onClick={adduser}>Add user</button>
              <button onClick={closeModal} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
           </form>
        </Modal>
        {   
            isAdmin === true && users.length > 0?
            <div className="book-wrapper">
            <div className="book-inner">
                <h1>Users</h1>
                <button className="btn btn-light logout mb-2" onClick={openModal}>Add user</button>
                {users.slice(0).reverse().map(u => 
                        <Card key={u._id}>
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