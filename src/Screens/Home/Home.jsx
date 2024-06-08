// src/screens/Home/Home.jsx
import React from 'react';
import { useError } from '../../contexts/ErrorContext';

/**
 * Home component that serves as the home page.
 * Includes a button to trigger an error for demonstration purposes.
 * @returns {JSX.Element} The home page element
 */
const Home = () => {
  const { toggleErrorState } = useError();

  /**
   * Handle button click to trigger an error.
   */
  const handleClick = () => {
    toggleErrorState('This is a test error message.');
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Trigger Error</button>
    </div>
  );
};

export default Home;
