// src/pages/EventPage.js

import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { fetchEvents } from '../services/eventsService';
import './EventPage.css'; // Custom styles for EventPage

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    document.title = 'Upcoming Events';
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      const eventData = await fetchEvents();
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="event-page-container mt-5">
      <h2>Upcoming Events</h2>
      <div className="event-cards-container">
        {events.map((event) => (
          <Card key={event.id} className="event-card mt-4">
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>
                {event.date} | {event.location}
              </Card.Text>
              <Button variant="primary" onClick={() => handleShowModal(event)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default EventPage;