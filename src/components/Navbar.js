// src/components/Navbar.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '/path/to/default-profile-pic.jpg');
  const profileMenuRef = useRef(null);
  const notificationMenuRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Debounce function to optimize search input
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSearch = debounce((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement your search logic here
    }
  }, 300);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        localStorage.setItem('profileImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`} role="navigation" aria-label="main navigation">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">ALUMNI ASSOCIATION</a>

        <div className="menu-icon" onClick={handleMenuToggle} aria-label="Toggle menu" role="button">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </div>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-links" aria-label="Home">Home</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-links" aria-label="Login">Login</a>
          </li>
          <li className="nav-item">
            <a href="/register" className="nav-links" aria-label="Register">Register</a>
          </li>
          <li className="nav-item">
            <a href="/profile" className="nav-links" aria-label="Profile">Profile</a>
          </li>
        </ul>

        <form className="search-form" onSubmit={handleSearch} aria-label="Search form">
          <input
            type="text"
            className={`search-input ${isDarkMode ? 'dark-mode' : ''}`}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            aria-label="Search input"
          />
          <button type="submit" className={`search-button ${isDarkMode ? 'dark-mode' : ''}`} aria-label="Submit search">
            Search
          </button>
        </form>

        <div className="profile-container" ref={profileMenuRef}>
          {isAuthenticated && (
            <>
              <div
                className="profile-menu"
                onClick={handleProfileToggle}
                aria-label="Profile menu"
                role="button"
                aria-expanded={isProfileOpen}
              >
                <img src={profileImage} alt="Profile" className="profile-pic" />
                <i className={`fas fa-chevron-down ${isProfileOpen ? 'active' : ''}`} />
              </div>
              {isProfileOpen && (
                <div className={`profile-dropdown ${isDarkMode ? 'dark-mode' : ''}`}>
                  <label htmlFor="upload-profile-pic" className="upload-label">
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    id="upload-profile-pic"
                    ref={fileInputRef}
                    onChange={handleProfileImageUpload}
                    style={{ display: 'none' }}
                    aria-label="Upload profile picture"
                  />
                  <a href="/profile" aria-label="View Profile">View Profile</a>
                  <a href="/settings" aria-label="Settings">Settings</a>
                  <button onClick={handleLogout} className={`btn-logout ${isDarkMode ? 'dark-mode' : ''}`} aria-label="Logout">
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="notification-container" ref={notificationMenuRef}>
          <button
            onClick={handleNotificationToggle}
            aria-label="Notifications"
            role="button"
            className={`btn-notification ${isDarkMode ? 'dark-mode' : ''}`}
            aria-expanded={isNotificationOpen}
          >
            <i className="fas fa-bell"></i>
          </button>
          {isNotificationOpen && (
            <div className={`notification-dropdown ${isDarkMode ? 'dark-mode' : ''}`}>
              <p>No new notifications</p>
              <ul>
                <li>Notification 1: Example message</li>
                <li>Notification 2: Another example message</li>
                {/* Add more notifications as needed */}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={handleDarkModeToggle}
          className={`btn-dark-mode ${isDarkMode ? 'dark-mode' : ''}`}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

