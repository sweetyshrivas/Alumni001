// src/pages/EventsPage.js

import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Spinner } from 'react-bootstrap';
import { fetchEvents } from '../services/eventsService';
import './EventsPage.css'; // Custom styles for EventsPage

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    document.title = 'Alumni Platform - Events';
    fetchEventList();
  }, []);

  const fetchEventList = async () => {
    try {
      const eventList = await fetchEvents();
      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading events...</p>
      </Container>
    );
  }

  return (
    <Container className="events-container mt-5">
      <h2 className="text-center">Upcoming Events</h2>
      <ListGroup className="mt-4">
        {events.map((event) => (
          <ListGroup.Item key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
            <div>
              <h5>{event.title}</h5>
              <p>{event.date} - {event.location}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {selectedEvent && (
        <Modal show={modalVisible} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedEvent.description}</p>
            <p>Date: {selectedEvent.date}</p>
            <p>Location: {selectedEvent.location}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default EventsPage;