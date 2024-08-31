// src/components/AlumniCard.js
import React from 'react';
import './AlumniCard.css';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="alumni-card">
      <img src={alumni.image} alt={alumni.name} className="alumni-image" />
      <h3>{alumni.name}</h3>
      <p>{alumni.achievement}</p>
    </div>
  );
};

export default AlumniCard;
