import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Project 3</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Button as={Link} variant='info' className="m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Button>
              <Button className="m-2" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} variant='primary' className="m-2" to="/login">
                Login
              </Button>
              <Button as={Link} variant='secondary' className="m-2" to="/signup">
                Signup
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
