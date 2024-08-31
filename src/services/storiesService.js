const API_BASE_URL = 'https://api.yourdomain.com/stories';

/**
 * Fetch all stories.
 * @returns {Promise<Array>} A promise that resolves to an array of stories.
 */
export const fetchStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

/**
 * Get a specific story by ID.
 * @param {string} id - The ID of the story to fetch.
 * @returns {Promise<Object>} A promise that resolves to the story object.
 */
export const getStoryById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching story for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Submit a new story.
 * @param {Object} story - The story data to submit.
 * @returns {Promise<Object>} A promise that resolves to the submitted story object.
 */
export const submitStory = async (story) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error submitting story:', error);
    throw error;
  }
};

/**
 * Fetch success stories.
 * @returns {Promise<Array>} A promise that resolves to an array of success stories.
 */
export const fetchSuccessStories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/success-stories`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching success stories:', error);
    throw error;
  }
};

