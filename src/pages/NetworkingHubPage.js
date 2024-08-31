import React, { useState, useEffect, useCallback } from 'react';
import './NetworkingHubPage.css'; // Import the CSS file for styling
import { fetchProfiles, sendMessage } from '../services/networkingService'; // Example service
import ProfileDetailsModal from '../components/ProfileDetailsModal'; // Assume a modal component for displaying profile details
import { debounce } from 'lodash'; // Import debounce function from lodash

const NetworkingHubPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control profile details modal

  // Load profiles on component mount
  useEffect(() => {
    const loadProfiles = async () => {
      setLoading(true); // Start loading
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setMessageError('Error fetching profiles. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadProfiles();
  }, []);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query.toLowerCase());
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true); // Open modal on profile click
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMessageSuccess(null);
    setMessageError('');

    if (!selectedProfile) {
      setMessageError('Please select a profile to send a message.');
      return;
    }

    try {
      await sendMessage(selectedProfile.id, message);
      setMessageSuccess('Message sent successfully!');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageError('Failed to send message. Please try again later.');
    }
  };

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="networking-hub">
      <h1>Networking Hub</h1>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search profiles..."
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Profile List */}
      <div className="profile-list">
        {loading ? (
          <p>Loading profiles...</p> // Show loading state
        ) : (
          filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`profile-card ${selectedProfile?.id === profile.id ? 'selected' : ''}`}
              onClick={() => handleProfileClick(profile)}
            >
              <img src={profile.profilePicture} alt={profile.name} className="profile-picture" />
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p>{profile.title}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Profile Details Modal */}
      {isModalOpen && selectedProfile && (
        <ProfileDetailsModal 
          profile={selectedProfile} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      {/* Messaging Section */}
      {selectedProfile && (
        <div className="message-section">
          <h2>Message {selectedProfile.name}</h2>
          <form onSubmit={handleSendMessage} className="message-form">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows="5"
              required
            />
            <button type="submit" className="send-button">Send Message</button>
            {messageSuccess && <p className="success-message">{messageSuccess}</p>}
            {messageError && <p className="error-message">{messageError}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default NetworkingHubPage;

