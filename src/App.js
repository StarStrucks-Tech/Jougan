// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home/Home';
import TicketDetails from './screens/TicketDetails/TicketDetails';
import Sidebar from './components/Sidebar/Sidebar';
import { ErrorProvider } from './contexts/ErrorContext';
import ErrorModal from './components/ErrorModal/ErrorModal';

/**
 * App component that sets up the main application structure.
 * Wraps the application in the ErrorProvider and sets up routing.
 * @returns {JSX.Element} The main app element
 */
function App() {
  return (
    <ErrorProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/ticket" element={<TicketDetails />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <ErrorModal />
        </div>
      </Router>
    </ErrorProvider>
  );
}

export default App;
