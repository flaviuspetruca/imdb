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

    const [addedUser, setAddedUser] = useState('');
    const [addedBook, setAddedBook] = useState('');
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [purchaseLink, setPurchaseLink] = useState('');
    const [categories, setCategories] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [publisher, setPublisher] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
        if(event)
		    setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        setAddedBook('');
        console.log(event.target.files[0])
	};

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Select role');
    const [email, setEmail] = useState('');

    const roles = ['admin', 'support', 'user'];

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
            setAddedUser(true);
            setTimeout(() => {
                closeModal1();
            }, 1000);
        }else{
            setAddedUser(false);
        }
    }

    const addbook = async() => {
        const formdata = new FormData();
        formdata.append("token", token);
        formdata.append("authors", authors);
        formdata.append("purchaseLink", purchaseLink);
        formdata.append("description", description);
        formdata.append("categories", categories);
        if(!selectedFile)
            return;
        formdata.append("thumbnail", selectedFile, selectedFile.name);
        formdata.append("title", title);
        const req = await fetch(`http://localhost:3000/addbook`,{
            method: 'POST',
            body: formdata
        })
        if(req.status === 201){
            setAddedBook(true);
            setTimeout(() => {
                closeModal2();
            }, 1000);
        }else{
            setAddedBook(false);
        }
    }

    const customStyles = {
    content : {
        color                 : 'white',
        border                : 'none',
        width                 : '400px',
        top                   : '50%',
        maxHeight             : '90vh',
        overflowY             : 'auto',
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
    const [modalIsOpen1,setIsOpen1] = useState(false);
    const [modalIsOpen2,setIsOpen2] = useState(false);
    
    function openModal1() {
        setIsOpen1(true);
    }
    
    function closeModal1(){
        setIsOpen1(false);
        setAddedUser('');
    }

    function openModal2() {
        setIsOpen2(true);
    }
    
    function closeModal2(){
        setIsOpen2(false);
        setAddedBook('');
        setIsFilePicked(false);
        setSelectedFile();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
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
        getusers()}, [addedUser, token]);

    return ( <>
        <Modal 
                isOpen={modalIsOpen1}
                onRequestClose={closeModal1}
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
                                    setAddedUser('');
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
                                    setAddedUser('');
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
                                    setAddedUser('');
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
                addedUser === false?
                <h5 className="text-center text-danger">Couldn't add user</h5>
                :
                addedUser === true?
                <h5 className="text-center text-success">Added user!</h5>
                :
                <></>
            }
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-light mr-5 reviewCreate" onClick={adduser}>Add user</button>
              <button onClick={closeModal1} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
           </form>
        </Modal>
        <Modal 
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">Add book</h2>
              <div className="form-group">
                <label className="create-label">Title</label>
                <input 
                    id="title"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setTitle(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Authors</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setAuthors(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Purchase link</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setPurchaseLink(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Categories</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setCategories(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Publisher</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setPublisher(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
              <label className="create-label">Published on</label>
                <input 
                    id="text"
                    type="text" 
                    className="form-control form-control-create" 
                    onChange={e => {
                                    setAddedBook('');
                                    setPublishedDate(e.target.value);
                                  }
                              }
                />
              </div>
              <div className="form-group">
                <label className="create-label">Description</label>
                <textarea
                    id="description"
                    rows="6" cols="50" 
                    className="form-control form-control-create"
                    value={description}
                    style={{resize: 'none'}}
                    onChange={e => {
                                    setAddedBook('');
                                    setDescription(e.target.value);
                                  }
                              }
                />
              </div>
            <div className="row justify-content-center mb-4">
            <input type="file" id="upload" hidden onChange={changeHandler}/>
            {
                isFilePicked ?
                <>
                <label id="uploadSelected" htmlFor="upload">{selectedFile.name}</label>
                <button className="btn btn-danger h-25" onClick={() => {
                    setIsFilePicked(false); setSelectedFile()}
                }>
                x
                </button>
                </>
                :
                <label id="upload" htmlFor="upload">Choose File</label>
            }
            </div>
            {
                addedBook === false?
                <h5 className="text-center text-danger">Make sure all field are completed</h5>
                :
                addedBook === true?
                <h5 className="text-center text-success">Added book!</h5>
                :
                <></>
            }
            <div className="row justify-content-center">
              <button type="submit" className="btn btn-light mr-5 reviewCreate" onClick={addbook}>Add book</button>
              <button onClick={closeModal2} className="btn btn-warning cancelBtn">Cancel</button>
            </div>
           </form>
        </Modal>
        {   
            isAdmin === true && users.length > 0?
            <div className="book-wrapper">
            <div className="book-inner">
                <h1>Users</h1>
                <button className="btn btn-light logout mb-2" onClick={openModal1}>Add user</button>
                <button className="btn btn-secondary logout mb-2" onClick={openModal2}>Add book</button>
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