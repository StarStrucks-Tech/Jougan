import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { toast } from 'react-toastify';
import '../Screens/login.css';
import { IMAGES, TOAST_MESSAGES } from '../constants/constants';
import { doc, setDoc } from 'firebase/firestore';
import { ROUTES } from '../constants/route';
import { DB_COLLECTIONS } from '../constants/dbconstants';
import { useError } from '../contexts/ErrorContext';
import { useState } from 'react';
// Component for signing in with Google
function SignInWithGoogle() {
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  const { toggleErrorState } = useError();
   // Function to handle Google sign-in
  async function googleLogin() {
     // Create a new instance of GoogleAuthProvider
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, provider);
        // Save user details to Firestore
      await setDoc(doc(db,DB_COLLECTIONS.USERS,result.user.uid),{
        email: result.user.email,
        username: result.user.displayName,
        hasProvidedInfo: false,//To check if the user has already filled the github ID
      });
      toast.success(TOAST_MESSAGES.SIGNINWITHGOOGLE_SUCCESS, {
        position: "top-center",
      });
      //For navigating to dashboard on successful signin
      navigate(ROUTES.DASHBOARD);

    } catch (error) {
      toggleErrorState(error.message);
      toast.error(TOAST_MESSAGES.SIGNINWITHGOOGLE_FAILURE, {
        position: "bottom-center",
      });
      console.error(error);
    }
  }

  return (
    <div>
    <button className="button-google" type="button" onClick={googleLogin}>
      <img src={IMAGES.GOOGLE} alt="Google logo" className="google-logo" />
      Sign in with Google
    </button>
    </div>
  );
}

export default SignInWithGoogle;
