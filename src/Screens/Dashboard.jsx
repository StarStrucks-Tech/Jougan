import React, { useEffect, useState, useCallback } from 'react';
import TicketList from '../Components/TicketList';
import Stats from '../Components/Stats';
import TicketModal from '../Screens/TicketDetails/TicketDetailModal';
import { viewTickets } from '../utils/networkHelper';
import './Dashboard.css';
import { useError } from '../contexts/ErrorContext';
import { TICKET_STATUS, ERROR_MESSAGES } from '../constants/constants';

/**
 * Dashboard Component
 * 
 * This component represents the main dashboard of the ticket management system.
 * It displays ticket statistics and a list of tickets.
 */
const Dashboard = () => {
  // Access the error handling function from the ErrorContext
  const { toggleErrorState } = useError();

  // State to store the list of tickets
  const [tickets, setTickets] = useState([]);

  // State to store various ticket statistics
  const [stats, setStats] = useState({
    unresolved: 0,
    overdue: 0,
    dueToday: 0,
    open: 0,
    onHold: 0,
    unassigned: 0
  });
  const [selectedTicket, setSelectedTicket] = useState(null); // New state for selected ticket
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal visibility

  /**
   * Calculates statistics based on the provided tickets
   * 
   * @param {Array} tickets - The array of ticket objects
   * @returns {Object} An object containing calculated statistics
   */
  const calculateStats = (tickets) => {
    const unresolved = tickets.length;
    const overdue = tickets.filter(ticket => ticket.status === TICKET_STATUS.OVERDUE).length;
    const dueToday = tickets.filter(ticket => ticket.status === TICKET_STATUS.DUE_TODAY).length;
    const open = tickets.filter(ticket => ticket.status === TICKET_STATUS.OPEN).length;
    const onHold = tickets.filter(ticket => ticket.status === TICKET_STATUS.ON_HOLD).length;
    const unassigned = tickets.filter(ticket => !ticket.assignee).length;

    return { unresolved, overdue, dueToday, open, onHold, unassigned };
  };

  /**
   * Fetches tickets from the server and updates the component state
   */
  const fetchTickets = useCallback(async () => {
    try {
      const result = await viewTickets();
      if (result.success) {
        setTickets(result.tickets);
        setStats(calculateStats(result.tickets));
      } else {
        toggleErrorState(ERROR_MESSAGES.FETCH_FAILED);
      }
    } catch (error) {
      toggleErrorState(ERROR_MESSAGES.GENERAL_ERROR);
    }
  }, [toggleErrorState]);

  // Effect hook to fetch tickets when the component mounts
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  /**
   * Refreshes the ticket list and statistics
   */
  const refreshTickets = async () => {
    await fetchTickets();
  };

  // New function to handle ticket selection
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // New function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  /**
   * Handles the update of a ticket
   * @param {Object} updatedTicket - The updated ticket object
   */
  const handleTicketUpdate = (updatedTicket) => {
    setTickets(prevTickets => 
      prevTickets.map(t => t.id === updatedTicket.id ? updatedTicket : t)
    );
    setStats(calculateStats([...tickets.filter(t => t.id !== updatedTicket.id), updatedTicket]));
    setSelectedTicket(updatedTicket);
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <Stats stats={stats} />
        <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
        {selectedTicket && (
          <TicketModal
            isOpen={isModalOpen}
            onClose={closeModal}
            ticket={selectedTicket}
            onTicketUpdate={handleTicketUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;