// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaQu-edVYe4-gYRy8JhXc0iryekrnLC9o",
  authDomain: "fir-app-4fc26.firebaseapp.com",
  projectId: "fir-app-4fc26",
  storageBucket: "fir-app-4fc26.appspot.com",
  messagingSenderId: "373585249061",
  appId: "1:373585249061:web:0df573a019af4585b850cc",
  measurementId: "G-3XN20EZN8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);