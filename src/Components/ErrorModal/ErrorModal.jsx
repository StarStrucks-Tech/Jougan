// // src/components/ErrorModal/ErrorModal.jsx
// import React from 'react';
// import { useError } from '../../contexts/ErrorContext';
// import './ErrorModal.css';

// /**
//  * ErrorModal component that displays an error message when an error occurs.
//  * @returns {JSX.Element|null} The error modal element or null if no error
//  */
// const ErrorModal = () => {
//   const { error, toggleErrorState } = useError();

//   if (!error) return null;

//   return (
//     <div className="error-modal-overlay">
//       <div className="error-modal">
//         <div className="error-modal-header">
//           <span className="error-modal-close" onClick={() => toggleErrorState(null)}>&times;</span>
//         </div>
//         <div className="error-modal-body">
//           <div className="error-icon">×</div>
//           <h2>Ooops!</h2>
//           <p>Something went wrong. {error}</p>
//           <button className="error-button" onClick={() => toggleErrorState(null)}>Try Again</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorModal;


// src/components/ErrorModal/ErrorModal.jsx
import React from 'react';
import { useError } from '../../contexts/ErrorContext';
import './ErrorModal.css';

/**
 * ErrorModal component that displays an error message when an error occurs.
 * @returns {JSX.Element|null} The error modal element or null if no error
 */
const ErrorModal = () => {
  const { error,showModal, toggleErrorState } = useError();

  if (!showModal) return null;

  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <div className="error-modal-header">
          <span className="error-modal-close" onClick={() => toggleErrorState(null,true)}>&times;</span>
        </div>
        <div className="error-modal-body">
          <div className="error-icon">×</div>
          <h2>Ooops!</h2>
          <p>Something went wrong. {error}</p>
          <button className="error-button" onClick={() => toggleErrorState(null,true)}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;