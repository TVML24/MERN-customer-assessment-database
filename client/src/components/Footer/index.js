import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-light p-2 position-absolute bottom-0">
      <Container className="container text-center mb-2">
        {location.pathname !== '/' && (
          <Button
            variant='dark'
            className="mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </Button>
        )}
        <h4>
          Made with{' '}
          <span
            className="emoji"
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
