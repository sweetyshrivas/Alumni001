import React from 'react';
import './ProfileDetailsModal.css'; // Ensure the path is correct

const ProfileDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Profile Details</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Profession:</strong> {user.profession}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="cancel">Close</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsModal;

