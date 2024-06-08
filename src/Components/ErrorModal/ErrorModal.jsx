// src/components/ErrorModal/ErrorModal.jsx
import React from 'react';
import { useError } from '../../contexts/ErrorContext';
import './ErrorModal.css';

const ErrorModal = () => {
  const { error, toggleErrorState } = useError();

  if (!error) return null;

  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <button className="close-button" onClick={() => toggleErrorState(null)}>×</button>
        <div className="error-modal-content">
          <div className="error-icon">✖️</div>
          <h2>Ooops!</h2>
          <p>{error}</p>
          <button className="try-again-button" onClick={() => toggleErrorState(null)}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
