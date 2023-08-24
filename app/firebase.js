    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPa3SwsutTRbvzA3QAAITBpwvJHTdI9Q",
  authDomain: "expensetracker-83009.firebaseapp.com",
  projectId: "expensetracker-83009",
  storageBucket: "expensetracker-83009.appspot.com",
  messagingSenderId: "671160502679",
  appId: "1:671160502679:web:5cd9bbafed0aa3a54f5cd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)