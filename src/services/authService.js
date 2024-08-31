// src/services/authService.js

import axios from 'axios';

// Define and export loginUser
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed');
  }
};

// Define and export registerUser
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post('/api/register', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Registration failed');
  }
};

// Define and export getProfile
export const getProfile = async () => {
  try {
    const response = await axios.get('/api/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to fetch profile');
  }
};

// Define and export forgotPassword
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/api/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Password reset failed');
  }
};


