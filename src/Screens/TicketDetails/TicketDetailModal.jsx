import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateStatus } from '../../utils/networkHelper';
import { useError } from '../../contexts/ErrorContext';
import './TicketDetailModal.css';

/**
 * TicketDetailModal component for displaying and editing ticket details.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.ticket - The ticket object to display/edit
 * @param {Function} props.onTicketUpdate - Function to call when ticket is updated
 */
const TicketDetailModal = ({ isOpen, onClose, ticket, onTicketUpdate }) => {
  const [editedTicket, setEditedTicket] = useState(ticket);
  const [isEditing, setIsEditing] = useState(false);
  const { toggleErrorState } = useError();

  // Update editedTicket when ticket prop changes
  useEffect(() => {
    setEditedTicket(ticket);
  }, [ticket]);

  if (!isOpen) return null;

  /**
   * Handle input changes in edit mode
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Save the edited ticket
   */
  const handleSave = async () => {
    const result = await updateStatus(ticket.id, editedTicket, toggleErrorState);
    if (result.success) {
      onTicketUpdate(editedTicket);
      setIsEditing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        {isEditing ? (
          <>
            <input
              className="modal-input"
              name="subject"
              value={editedTicket.subject}
              onChange={handleInputChange}
            />
            <textarea
              className="modal-input modal-textarea"
              name="description"
              value={editedTicket.description}
              onChange={handleInputChange}
            />
            <select
              className="modal-input"
              name="status"
              value={editedTicket.status}
              onChange={handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Not yet started">Not yet started</option>
              <option value="Merged and closed">Merged and closed</option>
            </select>
            <select
              className="modal-input"
              name="priority"
              value={editedTicket.priority}
              onChange={handleInputChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </>
        ) : (
          <>
            <h2 className="modal-title">{ticket.subject}</h2>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p>
              <strong>Priority:</strong> 
              <span className={`priority-${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </span>
            </p>
          </>
        )}
        <div className="modal-buttons">
          {isEditing ? (
            <>
              <button className="modal-button save-button" onClick={handleSave}>Save</button>
              <button className="modal-button cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <button className="modal-button edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

TicketDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  onTicketUpdate: PropTypes.func.isRequired,
};

export default TicketDetailModal;