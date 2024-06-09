import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Screens/Home/Home';
import TicketDetails from './Screens/TicketDetails/TicketDetails';
import Sidebar from './Components/Sidebar/Sidebar';
import SignInPage from './Screens/signUp';
import LoginPage from './Screens/login';
import { auth } from './config/firebase.config';
import { ToastContainer } from 'react-toastify';

function App() {
  const [user, setUser] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      setUser(user);
    })
  })
  return (
    <div className="app">
       <ToastContainer /> {/* Add ToastContainer here */}
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={user?<Navigate to="/home" />:<LoginPage/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/ticket" element={<TicketDetails />} />
          <Route path='/signup' element={<SignInPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </div>
    </div>
  
  );
}
  export default App;