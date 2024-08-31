// src/pages/NotFoundPage.js

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css'; // Custom styles for NotFoundPage

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="not-found-container text-center mt-5">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Button variant="primary" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;