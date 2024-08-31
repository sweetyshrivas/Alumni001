// src/components/SomeComponent.js

import React from 'react';
import { useAuth } from '../context/AuthContext';

const SomeComponent = () => {
  const context = useAuth();
  console.log('Context:', context); // Debugging line

  if (!context) {
    return <div>Context is not available</div>;
  }

  const { authState } = context;

  return <div>{authState ? 'Logged In' : 'Logged Out'}</div>;
};

export default SomeComponent;