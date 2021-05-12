import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import CanvasJSReact from '../canvasjs.react';
import Modal from 'react-modal';
import {useParams, useHistory} from 'react-router-dom';

const User = () => {

    const history = useHistory();
    const token = localStorage.getItem('token');
    const username = useParams().username;

    const [isAdmin, setIsAdmin] = useState('');
    const [deleted, setDeleted] = useState('');
    const [user, setUser] = useState('');


    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const getuser = async() => {
        const data = {token};
        const req = await fetch(`http://localhost:3000/getuser/${username}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
            setIsAdmin(true);
            const res = await req.json();
            setUser(res);
        }
        else{
            setIsAdmin(false);
        }
    }

    const removeuser = async() =>{
        const data = {token};
        const req = await fetch(`http://localhost:3000/deleteuser/${user._id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 204){
            setDeleted(true);
            history.push('/users');
        }
        else{
            setDeleted(false);
        }
    }

    const options = {
        title: {
          text: "User Reviews"
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "Apple",  y: 10  },
                      { label: "Orange", y: 15  },
                      { label: "Banana", y: 25  },
                      { label: "Mango",  y: 30  },
                      { label: "Grape",  y: 28  }
                  ]
         }]
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
      }
      
      function openModal2() {
          setIsOpen2(true);
      }
      
      function closeModal2(){
          setIsOpen2(false);
      }

    useEffect(() => {getuser()}, [deleted]);

    return ( 
        <>
        <Modal 
            isOpen={modalIsOpen1}
            onRequestClose={closeModal1}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            >
            <h5 className="text-center text-danger">Are you sure you want to remove this user?</h5>
            <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {removeuser(); closeModal1()}}>Remove user</button>
            <button onClick={closeModal1} className="btn btn-warning cancelLogout">Cancel</button>
        </Modal>
        <Modal 
            isOpen={modalIsOpen2}
            onRequestClose={closeModal2}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
            >
            <h5 className="text-center text-danger">Are you sure you want to remove this user?</h5>
            <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {removeuser(); closeModal2()}}>Remove user</button>
            <button onClick={closeModal2} className="btn btn-warning cancelLogout">Cancel</button>
        </Modal>
            {
                isAdmin === true?
                <div className="book-wrapper">
                    <div className="book-inner"> 
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>@{user.username}</h4>
                                <h6>Email: {user.email}</h6>
                                <button className="btn btn-light deleteBtn" onClick={openModal1}>Remove user</button>
                                <button className="btn btn-light modifyBtn" onClick={openModal2}>Modify user's permitions</button>
                            </div>
                            <div className="col-sm-6">
                            <CanvasJSChart options = {options}/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                isAdmin === false ?
                <NotFound/>
                :
                <div className="container dashboard-container text-center">
                    <h1 className="text-light">Loading book...&#128214;</h1>
                    <div className="spinner-border spinner-border-xl text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    );
}
 
export default User;