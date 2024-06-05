// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
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

//LISTEN FOR AUTH STATE CHANGES
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("user logged in: ", user);
  } else {
    console.log("user logged out: ");
  }
});

//SIGNUP
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //signup the user
  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
    //close the signup modal and reset the form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//LOGOUT
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth);
});

//LOGIN
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get the user infor
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  //login the user
  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    //close the login modal and reset the form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
