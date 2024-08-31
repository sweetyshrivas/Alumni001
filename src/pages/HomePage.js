// src/components/HomePage.js

import React, { useState } from 'react';
import './HomePage.css';
import {
  FaHandshake,
  FaDonate,
  FaBriefcase,
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaCommentDots
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('registration');
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to the Alumni Association Platform</h1>
        <p>Connect, Contribute, and Thrive with Your Alumni Community</p>
      </header>
      
      <nav className="homepage-nav">
        <ul>
          <li onClick={() => handleSectionClick('registration')} className={activeSection === 'registration' ? 'active' : ''}>
            <FaUsers /> Alumni Registration
          </li>
          <li onClick={() => handleSectionClick('donation')} className={activeSection === 'donation' ? 'active' : ''}>
            <FaDonate /> Donation Portal
          </li>
          <li onClick={() => handleSectionClick('networking')} className={activeSection === 'networking' ? 'active' : ''}>
            <FaHandshake /> Networking Hub
          </li>
          <li onClick={() => handleSectionClick('jobs')} className={activeSection === 'jobs' ? 'active' : ''}>
            <FaBriefcase /> Job Portal
          </li>
          <li onClick={() => handleSectionClick('directory')} className={activeSection === 'directory' ? 'active' : ''}>
            <FaUsers /> Alumni Directory
          </li>
          <li onClick={() => handleSectionClick('success')} className={activeSection === 'success' ? 'active' : ''}>
            <FaTrophy /> Success Stories
          </li>
          <li onClick={() => handleSectionClick('events')} className={activeSection === 'events' ? 'active' : ''}>
            <FaCalendarAlt /> Events & Reunions
          </li>
          <li onClick={() => handleSectionClick('feedback')} className={activeSection === 'feedback' ? 'active' : ''}>
            <FaCommentDots /> Feedback & Surveys
          </li>
        </ul>
      </nav>

      <main className="homepage-main">
        {activeSection === 'registration' && (
          <section className="section-content">
            <h2>Alumni Registration</h2>
            <p>Join our community by registering as an alumnus and stay connected with your peers and the institution. Update your profile to make the most of the networking opportunities.</p>
            <button className="cta-button" onClick={() => handleNavigation('/register')}>Register Now</button>
          </section>
        )}
        {activeSection === 'donation' && (
          <section className="section-content">
            <h2>Donation Portal</h2>
            <p>Support the college's growth and initiatives through secure donations. Your contributions help in fostering a culture of philanthropy and support various projects.</p>
            <button className="cta-button" onClick={() => handleNavigation('/donate')}>Donate Now</button>
          </section>
        )}
        {activeSection === 'networking' && (
          <section className="section-content">
            <h2>Networking Hub</h2>
            <p>Connect with fellow alumni based on shared interests, professions, and geographic locations. Explore professional networking, mentorship, and collaboration opportunities.</p>
            <button className="cta-button" onClick={() => handleNavigation('/network')}>Explore Networking</button>
          </section>
        )}
        {activeSection === 'jobs' && (
          <section className="section-content">
            <h2>Job Portal</h2>
            <p>Discover job opportunities and post job openings within the alumni network. Connect with potential employers and take your career to new heights.</p>
            <button className="cta-button" onClick={() => handleNavigation('/jobs')}>Browse Jobs</button>
          </section>
        )}
        {activeSection === 'directory' && (
          <section className="section-content">
            <h2>Alumni Directory</h2>
            <p>Find alumni based on various criteria such as graduation year, field of study, industry, or location. Enhance your network by reaching out to your peers.</p>
            <button className="cta-button" onClick={() => handleNavigation('/directory')}>View Directory</button>
          </section>
        )}
        {activeSection === 'success' && (
          <section className="section-content">
            <h2>Success Stories</h2>
            <p>Get inspired by the achievements and success stories of our alumni. Celebrate their contributions to society and their professional accomplishments.</p>
            <button className="cta-button" onClick={() => handleNavigation('/success-stories')}>Read Stories</button>
          </section>
        )}
        {activeSection === 'events' && (
          <section className="section-content">
            <h2>Events & Reunions</h2>
            <p>Stay updated with the latest events, reunions, workshops, and professional development sessions organized for alumni. Register and participate actively.</p>
            <button className="cta-button" onClick={() => handleNavigation('/events')}>View Events</button>
          </section>
        )}
        {activeSection === 'feedback' && (
          <section className="section-content">
            <h2>Feedback & Surveys</h2>
            <p>Share your experiences and suggestions to help us improve our services. Participate in surveys to shape future initiatives of the association.</p>
            <button className="cta-button" onClick={() => handleNavigation('/feedback')}>Give Feedback</button>
          </section>
        )}
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2024 Government Engineering College Alumni Association. All Rights Reserved.</p>
        <p>Contact us at <a href="mailto:alumni@gec.edu">alumni@gec.edu</a></p>
      </footer>
    </div>
  );
};

export default HomePage;