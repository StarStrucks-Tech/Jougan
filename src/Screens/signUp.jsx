import React, { useState } from 'react';
import { IMAGES } from '../constants';
import '../Screens/signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import SignInWithGoogle from '../Components/SignInWithGoogle';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if(user){
        await setDoc(doc(db,"Users",user.uid),{
          email: user.email,
          username: username,
        });
      }
      //console.log("user registered successfully");
      toast.success("User Registered Successfully!",{
        position: "top-center",
      });
      // localStorage.setItem('token', user.accessToken);
      // localStorage.setItem('user', JSON.stringify(user));
      navigate("/home");
    } catch (error) {
      //console.log(error);
      toast.error(error.message,{
        position: "bottom-center"
      })
    }
  };

  return (
    <div className="flex-container">
      <div className="form-container">
        <h1 className="title">CREATE YOUR ACCOUNT</h1>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label className="label" htmlFor="username">
              Username
            </label>
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
            <label className="label" htmlFor="email">
              Email
            </label>
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
            <label className="label" htmlFor="password">
              Password
            </label>
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
            <a className="link" href="forgot-pass">
              Forgot password?
            </a>
          </div>
          <div className="form-group">
            <button className="button" type="submit">
              Create Account
            </button>
          </div>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="form-group">
            <SignInWithGoogle/>
          </div>
          <div className="text-center">
            <span>Already have an account? </span>
            <a className="link" href="login">
              Log in
            </a>
          </div>
        </form>
      </div>
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
