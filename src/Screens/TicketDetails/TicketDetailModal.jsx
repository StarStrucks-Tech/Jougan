import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateStatus } from '../../utils/networkHelper';
import { useError } from '../../contexts/ErrorContext';
import { toast } from 'react-toastify';
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
      toast.success('Updated successfully');
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
              placeholder="Enter subject"
              value={editedTicket.subject}
              onChange={handleInputChange}
            />
            <textarea
              className="modal-input modal-textarea"
              name="description"
              placeholder="Enter description"
              value={editedTicket.description}
              onChange={handleInputChange}
            />
            <input
              className="modal-input"
              name="developer"
              placeholder="Enter developer name"
              value={editedTicket.developer}
              onChange={handleInputChange}
            />
            <select
              className="modal-input"
              name="product"
              value={editedTicket.product}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select product</option>
              <option value="Ticket Tracker">Ticket Tracker</option>
              <option value="Kubair Home">Kubair Home</option>
              <option value="Kubair Onboarding">Kubair Onboarding</option>
              <option value="Kubair Payments">Kubair Payments</option>
              <option value="Tanjiro">Tanjiro</option>
              <option value="Kubair Savings Account">Kubair Savings Account</option>
            </select>
            <select
              className="modal-input"
              name="type"
              placeholder="Enter type"
              value={editedTicket.type}
              onChange={handleInputChange}
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
            <select
              className="modal-input"
              name="status"
              value={editedTicket.status}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select status</option>
              <option value="RAISED">RAISED</option>
              <option value="UNDER DEVELOPMENT">UNDER DEVELOPMENT</option>
              <option value="DEV TESTING">DEV TESTING</option>
              <option value="QA TESTING">QA TESTING</option>
              <option value="IN REVIEW">IN REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="MERGED">MERGED</option>
            </select>
            <select
              className="modal-input"
              name="priority"
              value={editedTicket.priority}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </>
        ) : (
          <>
            <h1 className="modal-title">{ ticket.subject } </h1>
            <p><strong>Description:</strong> { ticket.description }</p>
            <p><strong>Developer:</strong> { ticket.developer }</p>
            <p><strong>Product:</strong> { ticket.product }</p>
            <p><strong>Type:</strong> { ticket.type }</p>
            <p><strong>Status:</strong> { ticket.status }</p>
            <p>
              <strong>Priority:</strong> 
              <span className={`priority-${ ticket.priority.toLowerCase()}`}>
                { ticket.priority }
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
    developer: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  onTicketUpdate: PropTypes.func.isRequired,
};

export default TicketDetailModal;
