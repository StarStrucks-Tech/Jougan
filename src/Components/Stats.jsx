import React from 'react';
import PropTypes from 'prop-types';
import './Stats.css';

const Stats = ({ stats }) => {
  return (
    <div className="stats">
      <div className="stat-item">Unresolved: {stats.unresolved}</div>
      <div className="stat-item">Overdue: {stats.overdue}</div>
      <div className="stat-item">Due Today: {stats.dueToday}</div>
      <div className="stat-item">Open: {stats.open}</div>
      <div className="stat-item">On Hold: {stats.onHold}</div>
      <div className="stat-item">Unassigned: {stats.unassigned}</div>
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.shape({
    unresolved: PropTypes.number,
    overdue: PropTypes.number,
    dueToday: PropTypes.number,
    open: PropTypes.number,
    onHold: PropTypes.number,
    unassigned: PropTypes.number,
  }).isRequired,
};

export default Stats;
