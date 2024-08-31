// src/pages/AboutPage.js
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Us</h1>

      {/* Company Overview Section */}
      <section className="company-overview">
        <p className="about-description">
          We are a leading company in our industry, committed to providing exceptional services and innovative solutions. Our team is passionate about making a difference and delivering value to our clients worldwide.
        </p>
      </section>

      {/* CEO Section */}
      <section className="ceo-section">
        <h2 className="section-title">Meet Our CEO</h2>
        <div className="profile-card">
          <img src=" " alt="CEO" className="profile-picture" />
          <div className="profile-info">
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
            <p>Jane Doe has over 20 years of experience in the industry and is the driving force behind our innovative approach and strategic vision.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Our Team</h2>
        <div className="team-profiles">
          {/* Repeat this block for each employee */}
          <div className="profile-card">
            <img src=" " alt="Employee 1" className="profile-picture" />
            <div className="profile-info">
              <h3>John Smith</h3>
              <p>Chief Technical Officer</p>
              <p>John leads our technology team with a focus on innovation and technical excellence.</p>
            </div>
          </div>

          {/* Add more team member profiles here... */}
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="mission-section">
        <h2 className="section-title">Our Mission & Values</h2>
        <p className="mission-description">
          Our mission is to deliver high-quality products that bring value to our customers. We believe in integrity, innovation, and excellence.
        </p>
      </section>

      {/* Company History Section */}
      <section className="history-section">
        <h2 className="section-title">Our History</h2>
        <p className="history-description">
          Founded in 2026, our company has grown from a small startup to a global leader in the industry, thanks to our dedicated team and loyal clients.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;