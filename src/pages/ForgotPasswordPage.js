// src/pages/ForgotPasswordPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { forgotPassword } from '../services/authService';
import './ForgotPasswordPage.css'; // Custom styles for ForgotPasswordPage

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setMessage('If this email exists in our system, a reset link has been sent.');
    } catch (error) {
      setError('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="forgot-password-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="forgot-password-form">
        <h2 className="text-center mb-4">Forgot Password</h2>
        {message && <Alert variant="success" className="text-center">{message}</Alert>}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        <Form onSubmit={handleForgotPassword}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Send Reset Link'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default ForgotPasswordPage;