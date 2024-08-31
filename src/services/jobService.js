import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

/**
 * Fetch jobs with an optional category filter.
 * @param {string} [category=''] - The category to filter jobs by.
 * @returns {Promise<Array>} A promise that resolves to an array of jobs.
 */
export const getJobs = async (category = '') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      params: { category },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

/**
 * Apply for a job with a specific job ID.
 * @param {string} jobId - The ID of the job to apply for.
 * @returns {Promise<Object>} A promise that resolves to the application result.
 */
export const applyForJob = async (jobId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs/${jobId}/apply`);
    return response.data;
  } catch (error) {
    console.error('Error applying for job:', error);
    throw error;
  }
};

/**
 * Fetch job categories.
 * @returns {Promise<Array>} A promise that resolves to an array of job categories.
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch saved jobs for the current user.
 * @returns {Promise<Array>} A promise that resolves to an array of saved jobs.
 */
export const getSavedJobs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs/saved`);
    return response.data;
  } catch (error) {
    console.error('Error fetching saved jobs:', error);
    throw error;
  }
};

/**
 * Save a job for the current user.
 * @param {string} jobId - The ID of the job to save.
 * @returns {Promise<Object>} A promise that resolves to the result of the save operation.
 */
export const saveJob = async (jobId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs/${jobId}/save`);
    return response.data;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

/**
 * Post a new job.
 * @param {Object} jobData - The job data to post.
 * @returns {Promise<Object>} A promise that resolves to the created job data.
 */
export const postJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error('Error posting job:', error);
    throw error;
  }
};
