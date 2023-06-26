// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyAF7LLxHKh23ratBnTMQQ6nql9egXExJ6M",
  authDomain: "jampoll.firebaseapp.com",
  projectId: "jampoll",
  storageBucket: "jampoll.appspot.com",
  messagingSenderId: "512516787357",
  appId: "1:512516787357:web:3006674537d2cf35139874",
  measurementId: "G-461KP4LPZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;