// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3mbJih3lWHG3nKVJX8ztcB-Vnm4lYAEM",
  authDomain: "emedra-3397e.firebaseapp.com",
  projectId: "emedra-3397e",
  storageBucket: "emedra-3397e.firebasestorage.app",
  messagingSenderId: "330808390185",
  appId: "1:330808390185:web:bfe18ffaa8168631b12238",
  measurementId: "G-6DDRNQZMV4"
};
const app = initializeApp(firebaseConfig);

// Firebase Auth instance
const auth = getAuth(app);

// Google provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
