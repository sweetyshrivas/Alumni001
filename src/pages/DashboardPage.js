// src/pages/DashboardPage.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { getProfile } from '../services/authService';
import './DashboardPage.css'; // Custom styles for DashboardPage

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Alumni Platform - Dashboard';
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userProfile = await getProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading your dashboard...</p>
      </Container>
    );
  }

  return (
    <Container className="dashboard-container">
      <h2 className="text-center mt-5">Hello, {profile?.name}!</h2>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Update your personal information and change your password.
              </Card.Text>
              <Button variant="primary" href="/profile">Go to Profile</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Events</Card.Title>
              <Card.Text>
                Check out upcoming alumni events and reunions.
              </Card.Text>
              <Button variant="primary" href="/events">View Events</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card">
            <Card.Body>
              <Card.Title>Donate</Card.Title>
              <Card.Text>
                Support your alma mater by making a donation.
              </Card.Text>
              <Button variant="primary" href="/donate">Donate Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;