import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoCollectorModal.css';
import { useError } from '../../contexts/ErrorContext';
/**
 * InfoCollectorModal component that collects additional information from the user in a modal.
 * @param {object} props - Component props
 * @param {boolean} props.isVisible - Whether the modal is visible
 * @param {function} props.onClose - Function to close the modal
 * @param {function} props.onSuccess - Function to call on successful submission
 * @returns {JSX.Element} The info collector modal
 */
const InfoCollectorModal = ({ isVisible, onSuccess }) => {
  const [githubId, setGithubId] = useState('');
  const { toggleErrorState } = useError();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!githubId) {
      toggleErrorState('GitHub ID is required');
    } else {
      console.log('GitHub ID:', githubId);
      navigate('/home');
      onSuccess(); //what should be done on successful submission
    }
  };

  if (!isVisible) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal">
        <div className="info-modal-body">
          <h2>Extra Information for Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="githubId">GitHub ID</label>
              <input
                type="text"
                id="githubId"
                placeholder="Enter your username"
                value={githubId}
                onChange={(e) => setGithubId(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InfoCollectorModal;
