// src/components/ProfileEditModal.js
import React from 'react';
import './ProfileEditModal.css'; // Ensure this file exists and is correctly named

const ProfileEditModal = ({ closeModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <h2>Edit Profile</h2>
        <form>
          {/* Form Fields for Editing Profile */}
          <label>
            Name:
            <input type="text" placeholder="Enter your name" />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Phone:
            <input type="tel" placeholder="Enter your phone number" />
          </label>
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="close-btn" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;

