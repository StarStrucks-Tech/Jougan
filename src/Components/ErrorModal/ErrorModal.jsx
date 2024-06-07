// src/components/ErrorModal/ErrorModal.jsx
import React from 'react';
import { useError } from '../../contexts/ErrorContext';
import './ErrorModal.css';

const ErrorModal = () => {
  const { error, hideError } = useError();

  if (!error) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-close" onClick={hideError}>&times;</span>
        </div>
        <div className="modal-body">
          <div className="error-icon">×</div>
          <h2>Ooops!</h2>
          <p>Something went wrong. {error}</p>
          <button className="modal-button" onClick={hideError}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
