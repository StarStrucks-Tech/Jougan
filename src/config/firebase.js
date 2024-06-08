import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: process.env.APIKEY, // API key for authenticating requests
  authDomain: process.env.AUTH_DOMAIN, // Auth domain for Firebase Auth
  projectId: process.env.PROJECT_ID, // Project ID for your Firebase project
  storageBucket: process.env.STORAGE_BUCKET, // Storage bucket for Firebase Storage
  messagingSenderId: process.env.MESSAGE_SENDER_ID, // Sender ID for Firebase Cloud Messaging
  appId: process.env.APP_ID, // App ID for the Firebase project
  databaseURL: "https://ticket-tracker-2c78a-default-rtdb.firebaseio.com" // Database URL for Firebase Realtime Database
};

//init firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
