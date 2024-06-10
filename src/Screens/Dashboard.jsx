import React, { useEffect, useState } from 'react';
import TicketList from '../Components/TicketList';
import Stats from '../Components/Stats';
import { viewTickets } from '../utils/networkHelper';
import './Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    unresolved: 0,
    overdue: 0,
    dueToday: 0,
    open: 0,
    onHold: 0,
    unassigned: 0
  });

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await viewTickets();
      if (result.success) {
        setTickets(result.tickets);
        // Calculate stats based on tickets
        const unresolved = result.tickets.length;
        const overdue = result.tickets.filter(ticket => ticket.status === 'overdue').length;
        const dueToday = result.tickets.filter(ticket => ticket.status === 'dueToday').length;
        const open = result.tickets.filter(ticket => ticket.status === 'open').length;
        const onHold = result.tickets.filter(ticket => ticket.status === 'onHold').length;
        const unassigned = result.tickets.filter(ticket => !ticket.assignee).length;

        setStats({ unresolved, overdue, dueToday, open, onHold, unassigned });
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="dashboard">
      <div className="main-content">
        <Stats stats={stats} />
        <TicketList tickets={tickets} />
      </div>
    </div>
  );
};

export default Dashboard;
