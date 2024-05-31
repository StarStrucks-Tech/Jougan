import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { ICONS, ACTIVE_ICONS, ACTIVE_CLASS } from '../../constants';
const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(ACTIVE_ICONS.HOME);
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link to="/home">
          <img
            src={ICONS.HOME}
            alt="Home"
            className={activeIcon === ACTIVE_ICONS.HOME ? ACTIVE_CLASS : ''}
            onClick={() => setActiveIcon(ACTIVE_ICONS.HOME)}
          />
        </Link>
        <Link to="/ticket">
          <img
            src={ICONS.TICKET}
            alt="Ticket"
            className={activeIcon === ACTIVE_ICONS.TICKET ? ACTIVE_CLASS : ''}
            onClick={() => setActiveIcon(ACTIVE_ICONS.TICKET)}
          />
        </Link>
        <Link to="/home">
          <img
            src={ICONS.USER}
            alt="User"
            className={activeIcon === ACTIVE_ICONS.USER ? ACTIVE_CLASS : ''}
            onClick={() => setActiveIcon(ACTIVE_ICONS.USER)}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
