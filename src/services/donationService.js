// src/services/donationService.js

const API_BASE_URL = 'https://api.yourdomain.com/donations';

/**
 * Get all donations.
 * @returns {Promise<Array>} A promise that resolves to an array of donations.
 */
export const getDonations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};

/**
 * Make a new donation.
 * @param {Object} donation - The donation data to send.
 * @returns {Promise<Object>} A promise that resolves to the created donation.
 */
export const makeDonation = async (donation) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donation),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error making donation:', error);
    throw error;
  }
};

/**
 * Process a specific donation.
 * @param {string} donationId - The ID of the donation to process.
 * @returns {Promise<Object>} A promise that resolves to the processed donation.
 */
export const processDonation = async (donationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${donationId}/process`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error processing donation ${donationId}:`, error);
    throw error;
  }
};

/**
 * Fetch donation-related data.
 * @returns {Promise<Object>} A promise that resolves to the donation data.
 */
export const fetchDonationData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/data`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching donation data:', error);
    throw error;
  }
};
