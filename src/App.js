import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Screens/Dashboard';
import TicketDetails from './Screens/TicketDetails/TicketDetails';
import Sidebar from './Components/Sidebar/Sidebar';
import SignInPage from './Screens/signUp';
import LoginPage from './Screens/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute
import { auth } from './config/firebase.config';


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
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } />
          <Route path="/ticket" element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          } />
          <Route path='/signup' element={<SignInPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
