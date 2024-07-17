import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { toast } from 'react-toastify';
import '../Screens/login.css';
import { IMAGES, TOAST_MESSAGES } from '../constants/constants';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ROUTES } from '../constants/route';
import { DB_COLLECTIONS } from '../constants/dbconstants';
import { useError } from '../contexts/ErrorContext';

function SignInWithGoogle() {
  const navigate = useNavigate();
  const { toggleErrorState } = useError();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, provider);
      
      // Check if the user document already exists
      const userDocRef = doc(db, DB_COLLECTIONS.USERS, result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // If the document doesn't exist, create it with hasProvidedInfo set to false
        await setDoc(userDocRef, {
          email: result.user.email,
          username: result.user.displayName,
          hasProvidedInfo: false,
        });
      } else {
        // If the document exists, just update the email and username
        await setDoc(userDocRef, {
          email: result.user.email,
          username: result.user.displayName,
        }, { merge: true });
      }

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