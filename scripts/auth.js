// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { setupPosts, setupUI, createAdmin } from "./index.js";

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

export const colUserRef = collection(db, "users");

//GET DATA FROM FIRESTORE
// getDocs(colRef).then((snapshot) => {
//   setupPosts(snapshot.docs);
//   setupUI(user);
// });

//LISTEN FOR AUTH STATE CHANGES
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    //Realtime listener
    onSnapshot(
      colRef,
      (snapshot) => {
        setupPosts(snapshot.docs);
        setupUI(user);
        createAdmin(user);
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    setupPosts([]);
    setupUI();
  }
});

// CREATE NEW POST
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = document.querySelector("#post_image").files[0];

  const maxSize = 36 * 1024; // 36 KB in bytes
  if (file) {
    if (file.size <= maxSize) {
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + file.name);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              // Add the post to Firestore with the image URL
              addDoc(colRef, {
                title: createForm["title"].value,
                content: createForm["content"].value,
                imageURL: url, // Add the image URL to the post data
                createdAt: serverTimestamp(),
              })
                .then(() => {
                  // Reset the form after successful upload and post creation
                  createForm.reset();
                })
                .catch((error) => {
                  console.error("Error adding document: ", error.message);
                });
            })
            .catch((error) => {
              console.error("Error getting download URL: ", error.message);
            });
        })
        .catch((error) => {
          console.error("Error uploading file: ", error.message);
        });
    } else {
      alert("File size must be between 20 KB and 25 KB.");
    }
  } else {
    // Add the post to Firestore without an image URL
    addDoc(colRef, {
      title: createForm["title"].value,
      content: createForm["content"].value,
      imageURL: "",
      createdAt: serverTimestamp(),
    })
      .then(() => {
        // Reset the form after successful post creation
        createForm.reset();
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
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
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const setDocRef = doc(colUserRef, cred.user.uid);
      setDoc(setDocRef, {
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
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
