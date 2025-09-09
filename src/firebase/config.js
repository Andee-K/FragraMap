// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzj08OPlccsnhipaeNBOinzSzG-M00_Ok",
  authDomain: "fragramap.firebaseapp.com",
  projectId: "fragramap",
  storageBucket: "fragramap.firebasestorage.app",
  messagingSenderId: "948069296421",
  appId: "1:948069296421:web:33126a5c89bcf3f58892cc",
  measurementId: "G-T77RX8RCYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
