// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const { user, isLoading, error } = useAuth(); // Assuming useAuth can return isLoading and error states

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner/loading component
  }

  if (error) {
    console.error("Authentication error:", error); // Log error for debugging
    return <div>Error occurred. Please try again later.</div>; // Optional: Customize error UI
  }

  return user ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;


