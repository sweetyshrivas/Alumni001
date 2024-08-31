// src/pages/DonationPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { processDonation } from '../services/donationService';
import './DonationPage.css'; // Custom styles for DonationPage

const DonationPage = () => {
  const [formData, setFormData] = useState({ amount: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await processDonation(formData);
      setSuccess('Thank you for your generous donation!');
      setFormData({ amount: '', message: '' });
    } catch (error) {
      setError('Donation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="donation-container mt-5">
      <h2 className="text-center">Make a Donation</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form className="mt-4" onSubmit={handleDonate}>
        <Form.Group controlId="formAmount" className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Message (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add a message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Donate Now'}
        </Button>
      </Form>
    </Container>
  );
};

export default DonationPage;