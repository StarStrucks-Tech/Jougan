import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateStatus } from '../../utils/networkHelper';
import { useError } from '../../contexts/ErrorContext';
import { toast } from 'react-toastify';
import { TEXTS } from '../../constants/constants'; 
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
  // State to hold the edited ticket information
  const [editedTicket, setEditedTicket] = useState(ticket);
  // State to determine if the modal is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // Function to handle error state from context
  const { toggleErrorState } = useError();

  // Update editedTicket when ticket prop changes
  useEffect(() => {
    setEditedTicket(ticket);
  }, [ticket]);

  // If the modal is not open, return null (no rendering)
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
      toast.success(TEXTS.UPDATE_MESSAGE); // Notify success
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
              placeholder={TEXTS.SUBJECT_PLACEHOLDER}
              value={editedTicket.subject}
              onChange={handleInputChange}
            />
            <textarea
              className="modal-input modal-textarea"
              name="description"
              placeholder={TEXTS.DESCRIPTION_PLACEHOLDER}
              value={editedTicket.description}
              onChange={handleInputChange}
            />
            <input
              className="modal-input"
              name="developer"
              placeholder={TEXTS.DEVELOPER_LABEL}
              value={editedTicket.developer}
              onChange={handleInputChange}
            />
            <select
              className="modal-input"
              name="product"
              value={editedTicket.product}
              onChange={handleInputChange}
            >
              {TEXTS.PRODUCTS.map(product => (
                <option key={product.value} value={product.value}>{product.label}</option>
              ))}
            </select>
            <select
              className="modal-input"
              name="type"
              value={editedTicket.type}
              onChange={handleInputChange}
            >
              {TEXTS.TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <select
              className="modal-input"
              name="status"
              value={editedTicket.status}
              onChange={handleInputChange}
            >
              {TEXTS.STATUSES.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <select
              className="modal-input"
              name="priority"
              value={editedTicket.priority}
              onChange={handleInputChange}
            >
              {TEXTS.PRIORITIES.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </>
        ) : (
          <>
            <h1 className="modal-title">{ticket.subject}</h1>
            <p><strong>{TEXTS.SUBJECT_HEADING}:</strong> {ticket.description}</p>
            <p><strong>{TEXTS.DEVELOPER_LABEL}:</strong> {ticket.developer}</p>
            <p><strong>{TEXTS.PRODUCT_LABEL}:</strong> {ticket.product}</p>
            <p><strong>{TEXTS.TYPE_LABEL}:</strong> {ticket.type}</p>
            <p><strong>{TEXTS.STATUS_LABEL}:</strong> {ticket.status}</p>
            <p>
              <strong>{TEXTS.PRIORITY_LABEL}:</strong> 
              <span className={`priority-${ticket.priority.toLowerCase()}`}>
                {ticket.priority}
              </span>
            </p>
          </>
        )}
        <div className="modal-buttons">
          {isEditing ? (
            <>
              <button className="modal-button save-button" onClick={handleSave}>{TEXTS.SAVE_BUTTON}</button>
              <button className="modal-button cancel-button" onClick={() => setIsEditing(false)}>{TEXTS.CANCEL_BUTTON}</button>
            </>
          ) : (
            <button className="modal-button edit-button" onClick={() => setIsEditing(true)}>{TEXTS.EDIT_BUTTON}</button>
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
