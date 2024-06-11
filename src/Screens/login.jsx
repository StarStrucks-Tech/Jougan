import React, { useState } from 'react';
import '../Screens/login.css'; 
import { IMAGES, TOAST_MESSAGES } from '../constants'; 
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importing Firebase authentication function
import { auth } from '../config/firebase.config'; // Importing Firebase configuration
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; // Importing toastify CSS
import SignInWithGoogle from '../Components/SignInWithGoogle'; // Importing Google sign-in component
import { ROUTES } from '../../constants/route';

// Functional component for the login page
const LoginPage = () => {
  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Sign in with email and password using Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(TOAST_MESSAGES.LOGIN_SUCCESS, {
        position: "top-center",
      });
      // Navigate to the home page upon successful login
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(TOAST_MESSAGES.LOGIN_FAILURE, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container">
      {/* Section for the illustration and titles */}
      <div className="image-section">
        <h2 className="subtitle">Stay On Track</h2>
        <h2 className="subtitle1">with <span className='spanele'>Ticket Tracker</span></h2>
        <img src={IMAGES.LOGIN} height={480} width={360} alt="Illustration" className="illustration" />
      </div>
      {/* Section for the login form */}
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
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input className="checkbox" type="checkbox" />
              <span>Remember for 30 days</span>
            </label>
            <a className="forgot-password" href="forgot-pass">Forgot password?</a>
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
    </div>
  );
};

export default LoginPage;
