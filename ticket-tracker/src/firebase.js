import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvJ1x6C87PQuF2Z24odsEXQQ5Ju4RSFT0", // API key for authenticating requests
  authDomain: "ticket-tracker-2c78a.firebaseapp.com", // Auth domain for Firebase Auth
  projectId: "ticket-tracker-2c78a", // Project ID for your Firebase project
  storageBucket: "ticket-tracker-2c78a.appspot.com", // Storage bucket for Firebase Storage
  messagingSenderId: "588965340658", // Sender ID for Firebase Cloud Messaging
  appId: "1:588965340658:web:3edd7467e69673dd7f776b", // App ID for the Firebase project
  databaseURL: "https://ticket-tracker-2c78a-default-rtdb.firebaseio.com" // Database URL for Firebase Realtime Database
};

// Initialize Firebase with the provided configuration
export const app = initializeApp(firebaseConfig);
