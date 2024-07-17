import React, { useState } from 'react';
import '../Screens/login.css';
import { IMAGES, TOAST_MESSAGES } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInWithGoogle from '../Components/SignInWithGoogle';
import { ROUTES } from '../constants/route';
import { useError } from '../contexts/ErrorContext';
import InfoCollectorModal from '../Components/InfoCollectorModal/InfoCollectorModal';
// Functional component for the login page
const LoginPage = () => {
  // State hooks for email, password, and modal visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showInfoCollector, setShowInfoCollector] = useState(false);
  const { toggleErrorState } = useError();

  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(TOAST_MESSAGES.LOGIN_SUCCESS, {
        position: "top-center",
      });
      navigate(ROUTES.DASHBOARD);
      setShowInfoCollector(true);
    } catch (error) {
      toast.error(TOAST_MESSAGES.LOGIN_FAILURE, {
        position: "bottom-center",
      });
      toggleErrorState(error.message);
    }
  };

  // Function to handle modal close and navigate to the home page
  const handleModalSuccess = () => {
    setShowInfoCollector(false);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="container">
      <div className="image-section">
        <h2 className="subtitle">Stay On Track</h2>
        <h2 className="subtitle1">with <span className='spanele'>Ticket Tracker</span></h2>
        <img src={IMAGES.LOGIN} height={480} width={360} alt="Illustration" className="illustration" />
      </div>
      <div className="form-section">
        <h1 className="form-title">WELCOME BACK !</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input className="input" onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <button className="button" type="submit">Sign in</button>
          </div>
          <div className="divider">or</div>
          <div className="form-group">
            <SignInWithGoogle />
          </div>
          <div className="signup-link">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span>Don't have an account? </span><a href="signup">Sign up</a>
          </div>
        </form>
      </div>
{/* {      (showInfoCollector? <InfoCollectorModal isVisible={showInfoCollector} onSuccess={handleModalSuccess} /> : <></>)  } */}
    </div>

  );
};

export default LoginPage;
