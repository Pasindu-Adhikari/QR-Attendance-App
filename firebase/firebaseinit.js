// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0XRaxLCmPWWCLeXo8yfC7PQ7aKNf7M2E",
  authDomain: "qr-attendance-af47a.firebaseapp.com",
  projectId: "qr-attendance-af47a",
  storageBucket: "qr-attendance-af47a.appspot.com",
  messagingSenderId: "480367750913",
  appId: "1:480367750913:web:848210d91b8a644aaff500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);