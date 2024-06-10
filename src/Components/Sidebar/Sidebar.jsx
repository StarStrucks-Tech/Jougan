import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { ICONS, ACTIVE_ICONS, ACTIVE_CLASS } from '../../constants';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_MESSAGES } from '../../constants';
const Sidebar = () => {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success(TOAST_MESSAGES.SIGN_OUT_SUCCESS);
      navigate("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
      toast.error(TOAST_MESSAGES.SIGN_OUT_FAILURE);
    }
  }
  const [activeIcon, setActiveIcon] = useState(ACTIVE_ICONS.HOME);
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <Link to="/dashboard">
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
