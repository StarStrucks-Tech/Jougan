import React from 'react';
import PropTypes from 'prop-types';
import './Stats.css'; // Importing the CSS file for styling

// Functional component to display various statistics
const Stats = ({ stats }) => {
  return (
    // Container for the stats
    <div className="stats">
      {/* Each stat item displays a specific stat */}
      <div className="stat-item">Unresolved: {stats.unresolved}</div>
      <div className="stat-item">Overdue: {stats.overdue}</div>
      <div className="stat-item">Due Today: {stats.dueToday}</div>
      <div className="stat-item">Open: {stats.open}</div>
      <div className="stat-item">On Hold: {stats.onHold}</div>
      <div className="stat-item">Unassigned: {stats.unassigned}</div>
    </div>
  );
};

// Defining the prop types for the Stats component
Stats.propTypes = {
  stats: PropTypes.shape({
    unresolved: PropTypes.number, // Number of unresolved items
    overdue: PropTypes.number,    // Number of overdue items
    dueToday: PropTypes.number,   // Number of items due today
    open: PropTypes.number,       // Number of open items
    onHold: PropTypes.number,     // Number of items on hold
    unassigned: PropTypes.number, // Number of unassigned items
  }).isRequired, // The stats prop is required
};

export default Stats;
