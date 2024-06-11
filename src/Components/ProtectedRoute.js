import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { ROUTES } from '../../constants/route';

// ProtectedRoute component to guard routes based on authentication status
const ProtectedRoute = ({ children }) => {
  // Retrieve the currentUser from the auth context
  const { currentUser } = useAuth();
  // If there is no authenticated user, redirect to the login page
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  // If the user is authenticated, render the children components
  return children;
};

// Prop validation for ProtectedRoute to ensure children are provided
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children should be a React node and is required
};

export default ProtectedRoute;
