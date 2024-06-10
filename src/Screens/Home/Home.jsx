// src/screens/Home/Home.jsx
import React, { useState } from 'react';
import InfoCollectorModal from '../../Components/InfoCollectorModal/InfoCollectorModal';
/**
 * Home component that serves as the home page.
 * @returns {JSX.Element} The home page element
 */
const Home = () => {
  const [isInfoModalVisible, setInfoModalVisible] = useState(true);
  return (
    <div>
      <h1>Home</h1>
      <InfoCollectorModal
            isVisible={isInfoModalVisible}
            onSuccess={() => setInfoModalVisible(false)}
          />
     
    </div>
  );
};

export default Home;
