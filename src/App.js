// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Screens/Home/Home';
import TicketDetails from './Screens/TicketDetails/TicketDetails';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/ticket" element={<TicketDetails />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>

  );
}
export default App;
