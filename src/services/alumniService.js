// src/services/alumniService.js

const API_BASE_URL = 'https://api.yourdomain.com/alumni';

/**
 * Fetch all alumni data.
 * @returns {Promise<Array>} A promise that resolves to an array of alumni.
 */
export const fetchAlumni = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching alumni data:', error);
    throw error;
  }
};

/**
 * Fetch alumni data by ID.
 * @param {string} id - The ID of the alumni to fetch.
 * @returns {Promise<Object>} A promise that resolves to the alumni object.
 */
export const getAlumniById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching alumni data for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Search alumni based on a query.
 * @param {string} query - The search query.
 * @returns {Promise<Array>} A promise that resolves to an array of matching alumni.
 */
export const searchAlumni = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}?search=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error searching alumni:', error);
    throw error;
  }
};
