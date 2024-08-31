const API_BASE_URL = 'https://api.yourdomain.com/networking';

/**
 * Fetch networking opportunities.
 * @returns {Promise<Array>} A promise that resolves to an array of networking opportunities.
 */
export const fetchNetworkingOpportunities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching networking opportunities:', error);
    throw error;
  }
};

/**
 * Get a specific networking opportunity by ID.
 * @param {string} id - The ID of the networking opportunity to fetch.
 * @returns {Promise<Object>} A promise that resolves to the networking opportunity object.
 */
export const getNetworkingOpportunityById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching networking opportunity for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new networking opportunity.
 * @param {Object} opportunity - The networking opportunity data to create.
 * @returns {Promise<Object>} A promise that resolves to the created networking opportunity object.
 */
export const createNetworkingOpportunity = async (opportunity) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opportunity),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error creating networking opportunity:', error);
    throw error;
  }
};

/**
 * Fetch profiles related to networking.
 * @returns {Promise<Array>} A promise that resolves to an array of profiles.
 */
export const fetchProfiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

/**
 * Send a message related to networking.
 * @param {Object} message - The message data to send.
 * @returns {Promise<Object>} A promise that resolves to the result of the message send operation.
 */
export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
