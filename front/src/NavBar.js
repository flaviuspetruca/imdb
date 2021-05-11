import React, {useEffect, useState} from 'react';
import {Navbar, Container, Nav,} from 'react-bootstrap'
import Modal from 'react-modal'

const NavBar = (logOut) => {

    const token = localStorage.getItem('token');

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

      const [categories, setCategories] = useState(false);

      const getCategories = async() => {
        const data = {token};
        const req = await fetch("http://localhost:3000/getcategories", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(req.status === 200){
          const res = await req.json();
          setCategories(res);
        }
      }

      const [modalIsOpen,setIsOpen] = useState(false);
      
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
      }

    useEffect(() => { getCategories() }, []);

    return ( 
    <>
    <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        >
        <h5 className="text-center text-danger">Are you sure you want to log out?</h5>
        <button className="btn btn-danger deleteBtn mt-0 mr-2" onClick={()=> {logOut.logOut(); closeModal()}}>Logout</button>
        <button onClick={closeModal} className="btn btn-warning cancelLogout">Cancel</button>
    </Modal>
    <Navbar expand="lg" fixed="top" className="navbar">
    <Container>
      <Navbar.Brand className="navbrand" href="/">IBDB</Navbar.Brand>
      <Nav className="mr-auto ml-5">
        <Nav.Link className="text-center navlink font-weight-normal" href="/">All</Nav.Link>
        {
          categories ?
            categories.map((category, index) => { if(index <= 2){ 
              const link = `/category/${category}`; 
              return(<Nav.Link className="text-center navlink" href={link}>{category}</Nav.Link>)
            }
            else{  
              return;
            }
            })
          :
          <></>
        }
      <div className="dropdown">
        <button className="dropbtn">Navbar</button>
          <div className="dropdown-content">
          {categories ?
                  categories.map((category, index) => { if(index > 2){
                    const link = `/category/${category}`; 
                    return(<a className="text-center navlink" href={link}>{category}</a>)
                  }})
              :
              <></>
            }
        </div>
      </div>
      </Nav>
          <button className="btn btn-light logout" onClick={openModal}>Log Out</button>
    </Container>
  </Navbar> 
  </>
  );
}
 
export default NavBar;