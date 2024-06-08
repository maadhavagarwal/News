import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
    
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
function Header() {
    
    const navigate = useNavigate(); // Correctly use useNavigate hook to get the navigate function

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('success');
        localStorage.removeItem('name');
        localStorage.removeItem('isAdmin');
        navigate("/login"); // Use navigate function to navigate to "/login"
    }

    
  return (
    <>
      {[false, ].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-lg mb-3  bg-info collapse-onselect">
          <Container fluid>
            <Navbar.Brand href="\" className='text-dark'>News App</Navbar.Brand>
            <Navbar.Toggle className='bg-success border-radius-light'aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              variant="dark"
            >
              <Offcanvas.Header closeButton className='bg-info '>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                 News App
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='bg-dark text-light'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '500px' }} navbarScroll>
                        <LinkContainer to="/profile">
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>
                        {localStorage.getItem("isAdmin") === 'true' && (
                            <LinkContainer to="/admin">
                                <Nav.Link ><Button variant="info">Admin</Button></Nav.Link>
                            </LinkContainer>
                        )}
                        {!localStorage.getItem("token") ? (
                            <LinkContainer to="/signup">
                                <Nav.Link className='mt-3'  variant='success'>Signup</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <Nav.Link><Button onClick={logout} variant='info'>Logout</Button></Nav.Link>
                        )}
                        {!localStorage.getItem("token") && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

    
          
export default Header;