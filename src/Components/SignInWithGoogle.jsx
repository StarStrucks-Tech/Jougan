import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../config/firebase.config';
import { toast } from 'react-toastify';
import '../Screens/login.css';
import { IMAGES } from '../constants';
import { doc, setDoc } from 'firebase/firestore';

function SignInWithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db,"Users",result.user.uid),{
        email: result.user.email,
        username: result.user.displayName,
      });
      toast.success("Signed in with Google successfully!", {
        position: "top-center",
      });
      navigate("/home");
      console.log(result);
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
      console.error(error);
    }
  }

  return (
    <button className="button-google" type="button" onClick={googleLogin}>
      <img src={IMAGES.GOOGLE} alt="Google logo" className="google-logo" />
      Sign in with Google
    </button>
  );
}

export default SignInWithGoogle;
