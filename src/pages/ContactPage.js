// src/pages/ContactPage.js
import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>

      {/* Contact Information Section */}
      <section className="contact-info">
        <h2 className="section-title">Our Contact Information</h2>
        <p>Feel free to reach out to us using the following information:</p>
        <p><strong>Email:</strong> info@company.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-890</p>
        <p><strong>Address:</strong> 1234 Business Avenue, Suite 100, City, Country</p>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2 className="section-title">Get in Touch</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" className="form-input" required />
          <input type="email" name="email" placeholder="Your Email" className="form-input" required />
          <textarea name="message" placeholder="Your Message" className="form-textarea" required></textarea>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </section>

      {/* Office Locations Section */}
      <section className="locations-section">
        <h2 className="section-title">Our Office Locations</h2>
        <div className="office-locations">
          <div className="location-card">
            <h3>Head Office</h3>
            <p>1234 Business Avenue, Suite 100, City, Country</p>
            <p><strong>Phone:</strong> +1 (234) 567-890</p>
          </div>
          <div className="location-card">
            <h3>Branch Office</h3>
            <p>5678 Commerce Street, Suite 200, Another City, Country</p>
            <p><strong>Phone:</strong> +1 (234) 987-654</p>
          </div>
          {/* Add more office locations here */}
        </div>
      </section>
      
      {/* Customer Service Section */}
      <section className="customer-service">
        <h2 className="section-title">Customer Service</h2>
        <p>If you have any questions or need assistance, our customer service team is here to help!</p>
        <p><strong>Email:</strong> support@company.com</p>
        <p><strong>Phone:</strong> +1 (234) 567-891</p>
        <p>Available: Monday - Friday, 9:00 AM - 5:00 PM</p>
      </section>
    </div>
  );
};

export default ContactPage;