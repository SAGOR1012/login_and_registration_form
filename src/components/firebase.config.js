import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTb5QMlx6vgSQOcIhS0sSfLLro7LfUVEU",
  authDomain: "user-email-form.firebaseapp.com",
  projectId: "user-email-form",
  storageBucket: "user-email-form.appspot.com",
  messagingSenderId: "455599085782",
  appId: "1:455599085782:web:23c1cda93347ebbf2e5177",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
