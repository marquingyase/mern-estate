// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f474a.firebaseapp.com",
  projectId: "mern-estate-f474a",
  storageBucket: "mern-estate-f474a.firebasestorage.app",
  messagingSenderId: "397204538011",
  appId: "1:397204538011:web:0c811945c171ea0e257c3e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
