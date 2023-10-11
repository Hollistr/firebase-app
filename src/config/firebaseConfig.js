// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// allows you to connect to the db
import { getFirestore } from "firebase/firestore";

// for auth
import { getAuth } from "firebase/auth";

// for storage
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaQu-edVYe4-gYRy8JhXc0iryekrnLC9o",
  authDomain: "fir-app-4fc26.firebaseapp.com",
  projectId: "fir-app-4fc26",
  storageBucket: "fir-app-4fc26.appspot.com",
  messagingSenderId: "373585249061",
  appId: "1:373585249061:web:0df573a019af4585b850cc",
  measurementId: "G-3XN20EZN8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// setup database and export it
export const db = getFirestore(app);

// setup auth and export it
export const auth = getAuth(app);

// setup storage and export it
export const storage = getStorage(app);
