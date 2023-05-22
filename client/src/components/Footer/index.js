import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-light p-2 position-absolute bottom-0" id='footer-size'>
      <Container className="container text-center mb-2 footer-colour" id='footer-size'>
        {location.pathname !== '/' && (
          <Button
            variant='dark'
            className="mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <h4 className='footer-colour' id='footer-size'>
          Powered by Spite - Made with{' '}
          <span
            className="emoji footer-colour"
            role="img"
            aria-label="heart"
            aria-hidden="false"
          >
            ❤️
          </span>
        </h4>
      </Container>
    </footer>
  );
};

export default Footer;
