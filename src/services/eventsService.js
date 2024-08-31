// src/services/eventsService.js

const API_BASE_URL = 'https://api.yourdomain.com/events';

/**
 * Fetch all events.
 * @returns {Promise<Array>} A promise that resolves to an array of events.
 */
export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

/**
 * Fetch a specific event by its ID.
 * @param {string} id - The ID of the event.
 * @returns {Promise<Object>} A promise that resolves to the event data.
 */
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching event data for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new event.
 * @param {Object} event - The event data to create.
 * @returns {Promise<Object>} A promise that resolves to the created event.
 */
export const createEvent = async (event) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

/**
 * RSVP to an event.
 * @param {string} eventId - The ID of the event to RSVP to.
 * @param {string} userId - The ID of the user RSVPing.
 * @returns {Promise<Object>} A promise that resolves to the RSVP result.
 */
export const rsvpEvent = async (eventId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error RSVPing event ID ${eventId}:`, error);
    throw error;
  }
};
