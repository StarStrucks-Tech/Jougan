import React from 'react';
import PropTypes from 'prop-types';

const SimpleLayout = ({ children }) => {
  return (
    <div className="main-content">
      {children}
    </div>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SimpleLayout;
