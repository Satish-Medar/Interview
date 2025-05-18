
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDOViFdgFSq-Ha5eofDd1IWY0x3uPdvMj4",
  authDomain: "interviewprep-930f8.firebaseapp.com",
  projectId: "interviewprep-930f8",
  storageBucket: "interviewprep-930f8.firebasestorage.app",
  messagingSenderId: "869149899169",
  appId: "1:869149899169:web:3aaec7b8029a1d3a5bb3e0",
  measurementId: "G-JV7P467PY1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
