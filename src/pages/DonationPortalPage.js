// src/pages/DonationPortalPage.js

import React, { useState, useEffect } from 'react';
import { getDonations, makeDonation, processDonation, fetchDonationData } from '../services/donationService';
import './DonationPortalPage.css'; // Import the CSS file for styling

const DonationPortalPage = () => {
  const [donations, setDonations] = useState([]);
  const [donation, setDonation] = useState({ amount: '', donor: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationData = await fetchDonationData();
        setDonations(donationData);
      } catch (error) {
        console.error('Error fetching donation data:', error);
        setErrorMessage('Failed to fetch donation data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!donation.amount || !donation.donor) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      await makeDonation(donation);
      setSuccessMessage('Donation made successfully!');
      setDonation({ amount: '', donor: '' }); // Reset form after submission
      const donationData = await fetchDonationData(); // Refresh the donations list
      setDonations(donationData);
    } catch (error) {
      console.error('Error making donation:', error);
      setErrorMessage('Error making donation. Please try again.');
    }
  };

  return (
    <div className="donation-page">
      <div className="donation-form-container">
        <div className="donation-form floating-center">
          <h2>Donation Portal</h2>
          <form onSubmit={handleDonationSubmit}>
            <label htmlFor="amount">Donation Amount:</label>
            <input 
              type="number" 
              name="amount" 
              value={donation.amount} 
              onChange={handleDonationChange} 
              placeholder="Enter amount" 
            />
            <label htmlFor="donor">Donor Name:</label>
            <input 
              type="text" 
              name="donor" 
              value={donation.donor} 
              onChange={handleDonationChange} 
              placeholder="Enter donor name" 
            />
            <button className="btn-submit" type="submit">Donate</button>
          </form>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>

      <div className="donation-history">
        <h2>Donation History</h2>
        <ul>
          {donations.map((d) => (
            <li key={d.id}>
              {d.amount} by {d.donor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonationPortalPage;