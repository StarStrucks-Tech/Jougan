import React from 'react';
import PropTypes from 'prop-types';
import { TABLE_HEADERS } from '../constants/constants';
import './TicketList.css';
import { Timestamp } from 'firebase/firestore';

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated.
 * 
 * @param {string} str - The string to truncate
 * @param {number} n - The maximum length of the string
 * @returns {string} The truncated string
 */
const truncate = (str, n) => {
  return (str && str.length > n) ? str.substr(0, n-1) + '...' : str;
};

/**
 * TicketList Component
 * 
 * This component displays a list of tickets in a table format.
 * It uses the TABLE_HEADERS constant to generate table headers dynamically.
 * 
 * @param {Object} props - The component props
 * @param {Array} props.tickets - An array of ticket objects to display
 * @param {Function} props.onTicketClick - Function to handle ticket click events
 */
const TicketList = ({ tickets, onTicketClick }) => {
  return (
    <div className="ticket-list">
      <table>
        <thead>
          <tr>
            {TABLE_HEADERS.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id} onClick={() => onTicketClick(ticket)}>
              <td>
  {ticket.createdAt && ticket.createdAt instanceof Timestamp
    ? new Date(ticket.createdAt.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).split('/').join('-')
    : 'N/A'}
</td>
              
              <td>{truncate(ticket.subject, 30) || 'N/A'}</td>
              <td>{truncate(ticket.description, 50) || 'N/A'}</td>
              <td>{ticket.status || 'N/A'}</td>
              <td>{ticket.type || 'N/A'}</td>
              <td>{ticket.priority || 'N/A'}</td>
              <td>{ticket.developer || 'N/A'}</td>
              <td>{ticket.product || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * PropTypes for the TicketList component
 */
TicketList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
      subject: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      type: PropTypes.string,
      priority: PropTypes.string,
      developer: PropTypes.string,
      product: PropTypes.string,
    })
  ).isRequired,
  onTicketClick: PropTypes.func.isRequired,
};

export default TicketList;