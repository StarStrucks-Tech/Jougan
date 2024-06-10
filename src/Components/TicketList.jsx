import React from 'react';
import PropTypes from 'prop-types';
import './TicketList.css';

const TicketList = ({ tickets }) => {
  return (
    <div className="ticket-list">
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

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      ticketId: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      requester: PropTypes.string.isRequired,
      requesterUpdated: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      assignee: PropTypes.string,
    })
  ).isRequired,
};

export default TicketList;
