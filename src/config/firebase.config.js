import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvJ1x6C87PQuF2Z24odsEXQQ5Ju4RSFT0",
  authDomain: "ticket-tracker-2c78a.firebaseapp.com",
  projectId: "ticket-tracker-2c78a",
  storageBucket: "ticket-tracker-2c78a.appspot.com",
  messagingSenderId: "588965340658",
  appId: "1:588965340658:web:3edd7467e69673dd7f776b",
  databaseURL: "https://ticket-tracker-2c78a-default-rtdb.firebaseio.com"
};

//Initialize Firebase only once
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
