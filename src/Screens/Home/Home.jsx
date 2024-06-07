// src/Screens/Home/Home.jsx
import React from 'react';
import { useError } from '../../contexts/ErrorContext';

const Home = () => {
  const { showError } = useError();
  const handleClick = () => {
    showError('This is a test error message.');
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Trigger Error</button>
    </div>
  );
};

export default Home;
