import React, {useState} from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import Modal from 'react-modal'

const NavBar = (logOut) => {

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
      const [modalIsOpen,setIsOpen] = useState(false);
      
      function openModal() {
          setIsOpen(true);
      }
      
      function closeModal(){
          setIsOpen(false);
      }

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
        <Nav.Link className="text-center navlink" href="#">Drama</Nav.Link>
        <Nav.Link className="text-center navlink" href="#">Detective</Nav.Link>
        <Nav.Link className="text-center navlink" href="#">Romance</Nav.Link>
      </Nav>
          <button className="btn btn-light logout" onClick={openModal}>Log Out</button>
    </Container>
  </Navbar> 
  </>
  );
}
 
export default NavBar;