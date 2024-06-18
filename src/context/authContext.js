import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.config';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application and provide auth context
export const AuthProvider = ({ children }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState(null);
  // State to manage loading state while checking auth status
  const [loading, setLoading] = useState(true);

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    // Subscribe to the auth state change
    const unsubscribe = onAuthStateChanged(auth, user => {
      // Update the currentUser state with the logged-in user
      setCurrentUser(user);
      // Set loading to false after checking the auth state
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return unsubscribe;
  }, []);

  // Provide the currentUser value to the context
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {/* Only render children if not loading */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Prop validation for AuthProvider to ensure children are provided
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
