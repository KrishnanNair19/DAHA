// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlFA_ABORKTZEXF-PqDOM0KOqXQtY4O1g",
  authDomain: "cs194-daha.firebaseapp.com",
  projectId: "cs194-daha",
  storageBucket: "cs194-daha.appspot.com",
  messagingSenderId: "186191644622",
  appId: "1:186191644622:web:47393dba714db5e4348d9f",
  measurementId: "G-F3V9JNGZ91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };