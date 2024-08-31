// src/components/CardComponent.js
import React from 'react';
import './cardComponent.css';

const CardComponent = ({ title, description, image, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <a href={link} className="card-link">Learn More</a>
      </div>
    </div>
  );
};

export default CardComponent;