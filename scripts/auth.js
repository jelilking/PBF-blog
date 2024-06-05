// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDde5REr6DSGvvn53h0exMKUDWuHeC5sPY",
  authDomain: "peak-body-fitness.firebaseapp.com",
  projectId: "peak-body-fitness",
  storageBucket: "peak-body-fitness.appspot.com",
  messagingSenderId: "1074385600003",
  appId: "1:1074385600003:web:44e02cfff0ca347836d836",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get Firestore Database and Authentication
const db = getFirestore();
const colRef = collection(db, "posts");
const auth = getAuth();

//SIGNUP
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup the user
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log(cred);
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
