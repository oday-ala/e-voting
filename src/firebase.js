// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI_pszqzWjXnskKS37A_UIWAPob749EiI",
  authDomain: "e-voting-via-blockchain-6c6b7.firebaseapp.com",
  projectId: "e-voting-via-blockchain-6c6b7",
  storageBucket: "e-voting-via-blockchain-6c6b7.appspot.com",
  messagingSenderId: "148245061836",
  appId: "1:148245061836:web:b5be13e56a43827fe3e269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);