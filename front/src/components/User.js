import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import CanvasJSReact from '../canvasjs.react';
import Modal from 'react-modal';
import {useParams, useHistory} from 'react-router-dom';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const User = () => {

    const history = useHistory();
    const token = localStorage.getItem('token');
    const username = useParams().username;

    const [isAdmin, setIsAdmin] = useState('');
    const [deleted, setDeleted] = useState('');
    const [user, setUser] = useState('');
    const [newRole, setNewRole] = useState('Change Role');
    const [modified, setModified] = useState('');
    const roles = ['admin', 'support', 'user'];


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

    const modifyuser = async() => {
        if(newRole === "Change Role"){
            setModified(false);
            return;
        }
        const data = {token, role: newRole, username};
        const req = await fetch(`http://localhost:3000/modifyuser/${user._id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 201){
            setModified(true);
        }else{
            setModified(false);
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

     const customStyles = {
        content : {
          color                 : 'white',
          border                : 'none',
          height                : '260px',
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
          setNewRole("Change Role");
      }

      function formatDate(date){

        var dd = date.getDate();
        var mm = date.getMonth()+1;
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = mm+'/'+dd;
        return date
     }

        function Last7Days () {
            var result = [];
            for (var i=0; i<7; i++) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                result.push( formatDate(d) )
            }
            return(result);
        }

    const dayArray = Last7Days();
    

      const options = {
        title: {
          text: "7 day review activity"
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: dayArray[0],  y: 10  },
                      { label: dayArray[1], y: 15  },
                      { label: dayArray[2], y: 25  },
                      { label: dayArray[3],  y: 30  },
                      { label: dayArray[4],  y: 28  },
                      { label: dayArray[5],  y: 28  },
                      { label: dayArray[6],  y: 28  }
                  ]
         }]
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
            <h5 className="text-center">Change user role</h5>
            <div className="row roleSelector">
                <DropdownButton title={newRole} onClick={() => {setModified('')}}>
                    {roles.map((r, index) => {if(r !== user.role) return(
                        <DropdownItem
                            key={index} 
                            onClick={() => setNewRole(r)}
                            >
                            {r}
                            </DropdownItem>)
                        })
                    }
                    </DropdownButton>
            </div>
            <div className="row justify-content-center mt-5">
            {
                    modified ?
                    <h6 className="text-center text-success">Modified!</h6>
                    :
                    modified === false ?
                    <h6 className="text-center text-danger">Plese select role!</h6>
                    :
                    <></>
                }
            </div>
            <div className="row fixed-bottom justify-content-center mb-3">
                <button className="btn btn-success mt-0 mr-2 changeBtn" onClick={()=> {modifyuser()}}>Change role</button>
                <button onClick={closeModal2} className="btn btn-warning cancelLogout">Cancel</button>
            </div>
        </Modal>
            {
                isAdmin === true?
                <div className="book-wrapper">
                    <div className="book-inner"> 
                        <div className="row">
                            <div className="col-sm-6">
                                <h4>@{user.username}</h4>
                                <h6>Email: {user.email}</h6>
                                <h6>Role: {user.role}</h6>
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