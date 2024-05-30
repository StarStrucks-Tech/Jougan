import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import homeIcon from '../../assets/Vector.png';
import ticketIcon from '../../assets/ticket-confirmation-outline.png';
import userIcon from '../../assets/account-box.png';
const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState('home');

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link to="/home">
          <img
            src={homeIcon}
            alt="Home"
            className={activeIcon === 'home' ? 'active' : ''}
            onClick={() => setActiveIcon('home')}
          />
        </Link>
        <Link to="/ticket">
          <img
            src={ticketIcon}
            alt="Ticket"
            className={activeIcon === 'ticket' ? 'active' : ''}
            onClick={() => setActiveIcon('ticket')}
          />
        </Link>
        <Link to="/home">
          <img
            src={userIcon}
            alt="User"
            className={activeIcon === 'user' ? 'active' : ''}
            onClick={() => setActiveIcon('user')}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
