import React, { useState } from 'react';
import '../Screens/login.css';
import { IMAGES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInWithGoogle from '../Components/SignInWithGoogle';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User Registered Successfully!", {
        position: "top-center",
      });
      navigate("/home");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
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
           <SignInWithGoogle/>
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
