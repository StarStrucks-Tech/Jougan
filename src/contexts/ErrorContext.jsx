import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import ErrorModal from '../Components/ErrorModal/ErrorModal';

// Create a Context for error management
const ErrorContext = createContext();

// Custom hook to use the ErrorContext
export const useError = () => useContext(ErrorContext);

/**
 * ErrorProvider component that provides the error state and toggle function
 * to its children components.
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ErrorContext Provider with error state and toggle function
 */
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [showModal,setshowModal]= useState(false);

  /**
   * Toggle the error state.
   * If a message is provided, set it as the error message.
   * If null is provided, clear the error message.
   * @param {string|null} message - The error message or null to clear the error
   */
  const toggleErrorState = (message,useErrorModal=false) => {
    setError(message);
    console.log(`show model ${showModal}`);
    if(useErrorModal)
  {  setshowModal(!showModal);
    console.log(`show model ${showModal}`);

  }
  };
  return (
    <ErrorContext.Provider value={{ error, toggleErrorState }}>
      {children}
{    (showModal? <ErrorModal/>: <></>)
    }
      
    
    </ErrorContext.Provider>
  );
};

// Add prop-types validation
ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
