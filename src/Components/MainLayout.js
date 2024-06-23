// src/Components/MainLayout.js
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;

// src/Components/SimpleLayout.js
