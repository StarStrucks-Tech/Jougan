import React from 'react';
import PropTypes from 'prop-types';
import './TicketList.css';

// Truncation function
const truncate = (str, n) => {
  return (str && str.length > n) ? str.substr(0, n-1) + '...' : str;
};

const TicketList = ({ tickets }) => {
  return (
    <div className="ticket-list">
      <h2>Tickets requiring your attention ({tickets.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Status</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Developer</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
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

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      subject: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      type: PropTypes.string,
      priority: PropTypes.string,
      developer: PropTypes.string,
      product: PropTypes.string,
    })
  ).isRequired,
};

export default TicketList;