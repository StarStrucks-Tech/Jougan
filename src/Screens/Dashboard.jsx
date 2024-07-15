import React, { useEffect, useState, useCallback} from 'react';
import TicketList from '../Components/TicketList';
import Stats from '../Components/Stats';
import TicketModal from '../Screens/TicketDetails/TicketDetailModal';
import { viewTickets } from '../utils/networkHelper';
import './Dashboard.css';
import { useError } from '../contexts/ErrorContext';
import { TICKET_STATUS, ERROR_MESSAGES } from '../constants/constants';
import InfoCollectorModal from '../Components/InfoCollectorModal/InfoCollectorModal.jsx';
import { doc, getDoc, updateDoc,setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import { DB_COLLECTIONS } from '../constants/dbconstants';
import { onAuthStateChanged } from 'firebase/auth';


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
  //New state for loading animation
  const [isLoading, setIsLoading] = useState(true);

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
  const [showInfoCollector, setShowInfoCollector] = useState(false);
  const [userChecked, setUserChecked] = useState(false);

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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false); // Set loading to false when fetching ends
    }
  }, [toggleErrorState]);

   /**
   * Checks user information and determines if additional info needs to be collected
   * @param {Object} user - The authenticated user object
   */
   const checkUserInfo = useCallback(async (user) => {
    if (user) {
      const userDocRef = doc(db, DB_COLLECTIONS.USERS, user.uid);
      const userDoc = await getDoc(userDocRef, { source: 'server' });
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (!userData.hasProvidedInfo) {
          setShowInfoCollector(true);
        } else {
          await fetchTickets();
        }
      } else {
        await setDoc(userDocRef, {
          email: user.email,
          username: user.displayName,
          hasProvidedInfo: false
        });
        setShowInfoCollector(true);
      }
    }
    setUserChecked(true);
  }, [fetchTickets]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkUserInfo(user);
      } else {
        setUserChecked(true);
      }
    });

    return () => unsubscribe();
  }, [checkUserInfo]);
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

 /**
   * Handles the successful submission of additional user information
   * @param {Object} collectedInfo - The information collected from the user
   */
 const handleModalSuccess = async (collectedInfo) => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, DB_COLLECTIONS.USERS, user.uid);
    try {
      await setDoc(userDocRef, {
        hasProvidedInfo: true,
        githubId: collectedInfo.githubId,
      }, { merge: true });
    } catch (error) {
      console.error("Error updating user document:", error);
    }
  }
  setShowInfoCollector(false);
  fetchTickets();
};
  if (!userChecked) {
    return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
  }
  

  return (
    <div className="dashboard">
      <div className="main-content">
        {showInfoCollector ? (
          <InfoCollectorModal
            isVisible={showInfoCollector}
            onSuccess={handleModalSuccess}
          />
        ) : isLoading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

