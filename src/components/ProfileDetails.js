// src/components/ProfileDetails.js
import React, { useState } from 'react';
import './ProfileDetails.css'; // Ensure this file exists and is correctly named
import { FaUserEdit, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ProfileEditModal from './ProfileEditModal'; // Example modal component for editing profile

const ProfileDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="profile-about">
            <h3>About</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
          </div>
        );
      case 'posts':
        return (
          <div className="profile-posts">
            <h3>Posts</h3>
            {/* Example posts, ideally this would be dynamically loaded from API */}
            <div className="post-card">Post 1</div>
            <div className="post-card">Post 2</div>
            <div className="post-card">Post 3</div>
          </div>
        );
      case 'friends':
        return (
          <div className="profile-friends">
            <h3>Friends</h3>
            <ul>
              <li>Friend 1</li>
              <li>Friend 2</li>
              <li>Friend 3</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-details">
      <div className="profile-header">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2>John Doe</h2>
          <p><FaEnvelope /> john.doe@example.com</p>
          <p><FaPhoneAlt /> +1 234 567 890</p>
          <p><FaMapMarkerAlt /> New York, USA</p>
        </div>
        <div className="profile-actions">
          <button className="edit-profile-btn" onClick={handleEditProfile}>
            <FaUserEdit /> Edit Profile
          </button>
          <button className="message-btn"><FaEnvelope /> Message</button>
        </div>
      </div>
      <div className="profile-social-links">
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
      </div>
      <div className="profile-tabs">
        <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About</button>
        <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => setActiveTab('posts')}>Posts</button>
        <button className={activeTab === 'friends' ? 'active' : ''} onClick={() => setActiveTab('friends')}>Friends</button>
      </div>
      <div className="profile-content">
        {renderActiveTab()}
      </div>
      {showModal && <ProfileEditModal closeModal={closeModal} />}
    </div>
  );
};

export default ProfileDetails;


