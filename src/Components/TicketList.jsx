import React from 'react';
import PropTypes from 'prop-types';
import './TicketList.css'; // Importing the CSS file for styling

// Functional component to display a list of tickets
const TicketList = ({ tickets }) => {
  return (
    // Container for the ticket list
    <div className="ticket-list">
      {/* Heading with the count of tickets */}
      <h2>Tickets requiring your attention ({tickets.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>ID</th>
            <th>Subject</th>
            <th>Requester</th>
            <th>Requester Updated</th>
            <th>Group</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over the tickets array and render each ticket as a table row */}
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.status}</td>
              <td>{ticket.ticketId}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.requester}</td>
              <td>{new Date(ticket.requesterUpdated).toLocaleString()}</td>
              <td>{ticket.group}</td>
              <td>{ticket.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Defining the prop types for the TicketList component
TicketList.propTypes = {
  // tickets should be an array of objects with specific properties
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,             // Unique identifier for the ticket
      status: PropTypes.string.isRequired,         // Status of the ticket
      ticketId: PropTypes.string.isRequired,       // Ticket ID
      subject: PropTypes.string.isRequired,        // Subject of the ticket
      requester: PropTypes.string.isRequired,      // Requester of the ticket
      requesterUpdated: PropTypes.string.isRequired, // Date when the requester last updated the ticket
      group: PropTypes.string.isRequired,          // Group assigned to the ticket
      assignee: PropTypes.string,                  // Assignee of the ticket (optional)
    })
  ).isRequired, // The tickets prop is required
};

export default TicketList;
