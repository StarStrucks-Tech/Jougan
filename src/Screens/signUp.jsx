import React, { useState } from 'react';
import { IMAGES, TOAST_MESSAGES } from '../constants'; 
import '../Screens/signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importing Firebase authentication function
import { auth, db } from '../config/firebase.config'; // Importing Firebase configuration for auth and Firestore
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc } from 'firebase/firestore'; // Importing Firestore functions for document creation
import { toast } from 'react-toastify'; 
import SignInWithGoogle from '../Components/SignInWithGoogle'; // Importing Google sign-in component
import { ROUTES } from '../../constants/route';

// Functional component for the sign-in page
const SignInPage = () => {
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom
  const [email, setEmail] = useState(""); // State hook for managing email input value
  const [username, setUsername] = useState(""); // State hook for managing username input value
  const [password, setPassword] = useState(""); // State hook for managing password input value
  const [error] = useState(null); // State hook for managing error message (currently unused)

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Create user with email and password using Firebase authentication
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser; // Get the current authenticated user
      if (user) {
        // Add user details to Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
        });
      }
      toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS, {
        position: "top-center",
      });
      // Navigate to the home page upon successful signup
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(TOAST_MESSAGES.SIGNUP_FAILURE, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex-container">
      {/* Section for the signup form */}
      <div className="form-container">
        <h1 className="title">CREATE YOUR ACCOUNT</h1>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>} {/* Error message display (currently unused) */}
          <div className="form-group">
            <label className="label" htmlFor="username">Username</label>
            <input
              className="input"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              className="input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              required
              minLength="6"
            />
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input className="checkbox" type="checkbox" />
              <span>Remember for 30 days</span>
            </label>
            <a className="link" href="forgot-pass">Forgot password?</a>
          </div>
          <div className="form-group">
            <button className="button" type="submit">Create Account</button>
          </div>
          <div className="divider"><span>or</span></div>
          <div className="form-group">
            <SignInWithGoogle /> {/* Google sign-in component */}
          </div>
          <div className="text-center">
            <span>Already have an account? </span>
            <a className="link" href="login">Log in</a>
          </div>
        </form>
      </div>
      {/* Section for the illustration and titles */}
      <div className="image-container">
        <div className="text-center">
          <h2 className="subtitle">Stay On Track</h2>
          <h2 className="subtitle1">with <span className='spanele'>Ticket Tracker</span></h2>
          <img src={IMAGES.WOMEN} height={320} width={180} alt="Illustration" className="image" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
