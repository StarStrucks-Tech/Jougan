import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { ICONS, ACTIVE_ICONS, ACTIVE_CLASS } from '../../constants';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
const Sidebar = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    navigate("/login");
  }
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
            src={ICONS.LOGOUT}
            alt="User"
            className={activeIcon === ACTIVE_ICONS.USER ? ACTIVE_CLASS : ''}
            onClick={handleLogout}
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
