import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './Screens/Dashboard';
import TicketDetails from './Screens/TicketDetails/TicketDetails';
import SignInPage from './Screens/signUp';
import LoginPage from './Screens/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/ProtectedRoute';
import { auth } from './config/firebase.config';
import { ErrorProvider } from './contexts/ErrorContext';
import MainLayout from './Components/MainLayout';
import SimpleLayout from './Components/SimpleLayout';

function App() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ErrorProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/ticket" element={
          <ProtectedRoute>
            <MainLayout>
              <TicketDetails />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <SimpleLayout>
            <SignInPage />
          </SimpleLayout>
        } />
        <Route path="/login" element={
          <SimpleLayout>
            <LoginPage />
          </SimpleLayout>
        } />
      </Routes>
    </ErrorProvider>
  );
}

export default App;
