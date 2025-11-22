// authService.js

// ✅ Firebase Auth
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// ✅ API Auth
import api from "./api";

// ---------------- Firebase Auth Methods ---------------- //

// Register new user via Firebase
export const registerWithFirebase = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Login existing user via Firebase
export const loginWithFirebase = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout via Firebase
export const logoutFirebase = async () => {
  await signOut(auth);
};

// ---------------- API Auth Methods ---------------- //

// Login via backend API
export const loginWithAPI = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// Register via backend API
export const registerWithAPI = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

