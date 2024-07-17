import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { ICONS, ACTIVE_ICONS, ACTIVE_CLASS } from '../../constants/constants';
import { ROUTES } from '../../constants/route';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_MESSAGES } from '../../constants/constants';
const Sidebar = () => {

  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();
  // This function handles the logout processs
  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      toast.success(TOAST_MESSAGES.SIGN_OUT_SUCCESS);
      // Navigate to the login page
      navigate(ROUTES.LOGIN);
    } catch (error) {
      //console.error("Failed to sign out:", error);
      toast.error(TOAST_MESSAGES.SIGN_OUT_FAILURE);
    }
  }
  const [activeIcon, setActiveIcon] = useState(ACTIVE_ICONS.HOME);
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link to="/dashboard" className="tooltip">
          <img
            src={ICONS.HOME}
            alt="Home"
            className={activeIcon === ACTIVE_ICONS.HOME ? ACTIVE_CLASS : ''}
            onClick={() => setActiveIcon(ACTIVE_ICONS.HOME)}
          />
          <span className="tooltiptext">Home</span>
        </Link>
        <Link to="/ticket" className="tooltip">
          <img
            src={ICONS.TICKET}
            alt="Ticket"
            className={activeIcon === ACTIVE_ICONS.TICKET ? ACTIVE_CLASS : ''}
            onClick={() => setActiveIcon(ACTIVE_ICONS.TICKET)}
          />
          <span className="tooltiptext">Ticket</span>
        </Link>
        <Link to="/home" className="tooltip">
          <img
            src={ICONS.LOGOUT}
            alt="Logout"
            className={activeIcon === ACTIVE_ICONS.USER ? ACTIVE_CLASS : ''}
            onClick={handleLogout}
          />
          <span className="tooltiptext">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;