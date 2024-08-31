// src/components/EventCard.js
import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;
