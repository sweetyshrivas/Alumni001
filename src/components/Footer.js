// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <h1>AlumniConnect</h1>
            <p>Connecting Alumni Worldwide</p>
          </div>
          <div className="footer-newsletter">
            <h2>Subscribe to our Newsletter</h2>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Subscribe to newsletter"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-column">
            <h2>Quick Links</h2>
            <ul>
              <li><Link to="/">Home <FaChevronRight /></Link></li>
              <li><Link to="/profile">Profile <FaChevronRight /></Link></li>
              <li><Link to="/donation">Donation <FaChevronRight /></Link></li>
              <li><Link to="/jobs">Job Portal <FaChevronRight /></Link></li>
              <li><Link to="/events">Events <FaChevronRight /></Link></li>
              <li><Link to="/about">About Us <FaChevronRight /></Link></li>
              <li><Link to="/contact">Contact Us <FaChevronRight /></Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h2>Contact Us</h2>
            <ul>
              <li><FaPhone /> <a href="tel:+1234567890">+123 456 7890</a></li>
              <li><FaEnvelope /> <a href="mailto:support@alumniconnect.com">support@alumniconnect.com</a></li>
              <li><FaMapMarkerAlt /> <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">123 Alumni Street, City, Country</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AlumniConnect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
