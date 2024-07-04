import React, { useState, useRef } from "react";
import { createTicket } from "../../utils/networkHelper";
import { TEXTS } from "../../constants/constants";
import "./TicketDetails.css";
import { useError } from '../../contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';

/**
 * TicketDetails Component
 * 
 * This component renders a form for creating a new ticket.
 * It handles form submission, validation, and redirects to the dashboard on success.
 */
function TicketDetails() {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Custom hook for error handling
  const { toggleErrorState } = useError();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // References to form input elements
  const developerRef = useRef(null);
  const statusRef = useRef(null);
  const productRef = useRef(null);
  const typeRef = useRef(null);
  const priorityRef = useRef(null);
  const subjectRef = useRef(null);
  const descriptionRef = useRef(null);

  /**
   * Handles form submission
   * @param {Event} event - The form submission event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Define fields to be validated
    const fields = [
      { ref: developerRef, name: "Developer" },
      { ref: statusRef, name: "Status" },
      { ref: productRef, name: "Product" },
      { ref: typeRef, name: "Type" },
      { ref: priorityRef, name: "Priority" },
      { ref: subjectRef, name: "Subject" },
      { ref: descriptionRef, name: "Description" },
    ];

    // Check for empty fields
    const emptyFields = fields.filter(field => !field.ref.current.value.trim());

    if (emptyFields.length > 0) {
      setIsLoading(false);
      const emptyFieldNames = emptyFields.map(field => field.name).join(", ");
      toggleErrorState(`Please fill in all fields. Missing: ${emptyFieldNames}`, true);
      return;
    }

    // Collect form data
    const ticketData = {
      developer: developerRef.current.value,
      status: statusRef.current.value,
      product: productRef.current.value,
      type: typeRef.current.value,
      priority: priorityRef.current.value,
      subject: subjectRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      // Attempt to create the ticket
      const result = await createTicket(ticketData, toggleErrorState);

      if (result.success) {
        // Redirect to dashboard on success
        navigate('/dashboard');
      }
    } catch (error) {
      toggleErrorState('An error occurred while submitting the form.', true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className="nav-container">
        <div className="heading-container">
          <span className="ticket">{TEXTS.NAV_HEADING}</span>
        </div>
      </nav>

      <form onSubmit={handleSubmit} className="ticketpage_container">
        <div className="left-section">
          <div className="form-group">
            <label htmlFor="Developer">{TEXTS.DEVELOPER_LABEL}</label>
            <div style={{ position: "relative" }}>
              <span className="material-icons icon">Person</span>
              <select id="developer" name="developer" ref={developerRef}>
                {TEXTS.DEVELOPERS.map((dev) => (
                  <option key={dev.value} value={dev.value}>
                    {dev.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">{TEXTS.STATUS_LABEL}</label>
            <select id="status" name="status" ref={statusRef}>
              {TEXTS.STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="product">{TEXTS.PRODUCT_LABEL}</label>
            <select id="product" name="product" ref={productRef}>
              {TEXTS.PRODUCTS.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>
          <div className="horizontal-group">
            <div className="form-group">
              <label htmlFor="type">{TEXTS.TYPE_LABEL}</label>
              <select id="type" name="type" ref={typeRef}>
                {TEXTS.TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">{TEXTS.PRIORITY_LABEL}</label>
              <select id="priority" name="priority" ref={priorityRef}>
                {TEXTS.PRIORITIES.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="heading-tab">{TEXTS.SUBJECT_HEADING}</div>
          <div className="box1">
            <textarea
              ref={subjectRef}
              placeholder={TEXTS.SUBJECT_PLACEHOLDER}
              rows="4"
            />
          </div>
          <div className="box2">
            <textarea
              ref={descriptionRef}
              placeholder={TEXTS.DESCRIPTION_PLACEHOLDER}
              rows="4"
            />
          </div>
        </div>
        {isLoading && <div className="loading-message">{TEXTS.LOADING_MESSAGE}</div>}
        <div className="footer">
          <button type="submit" className="button-submit" disabled={isLoading}>
            {isLoading ? TEXTS.SUBMITTING_BUTTON : TEXTS.SUBMIT_BUTTON}
          </button>
        </div>
      </form>
    </>
  );
}

export default TicketDetails;
