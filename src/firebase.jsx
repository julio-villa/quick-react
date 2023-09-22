// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu3oUkFCHJllIqXBcJnBOPaqXzuR2-bWg",
  authDomain: "react-tutorial-1adb1.firebaseapp.com",
  projectId: "react-tutorial-1adb1",
  storageBucket: "react-tutorial-1adb1.appspot.com",
  messagingSenderId: "228891729202",
  appId: "1:228891729202:web:7f4a7db21b3043976d8b2b",
  measurementId: "G-94YMQVHMZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);