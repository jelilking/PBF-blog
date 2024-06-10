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

const firebaseConfig = {
  apiKey: "AIzaSyDde5REr6DSGvvn53h0exMKUDWuHeC5sPY",
  authDomain: "peak-body-fitness.firebaseapp.com",
  projectId: "peak-body-fitness",
  storageBucket: "peak-body-fitness.appspot.com",
  messagingSenderId: "1074385600003",
  appId: "1:1074385600003:web:44e02cfff0ca347836d836",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "posts");
const auth = getAuth();

export const colUserRef = collection(db, "users");

onAuthStateChanged(auth, (user) => {
  if (user) {
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
    getDocs(colRef)
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        setupUI();
        createAdmin([]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
});

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
              addDoc(colRef, {
                title: createForm["title"].value,
                content: createForm["content"].value,
                imageURL: url,
                createdAt: serverTimestamp(),
              })
                .then(() => {
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
    addDoc(colRef, {
      title: createForm["title"].value,
      content: createForm["content"].value,
      imageURL: "",
      createdAt: serverTimestamp(),
    })
      .then(() => {
        createForm.reset();
      })
      .catch((err) => {
        signupForm.querySelector(".error").innerHTML = err.message;
      });
  }
});

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  const bio = signupForm["signup-bio"].value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return setDoc(doc(colUserRef, cred.user.uid), {
        bio: bio,
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).catch((err) => {
    console.error("Error signing out: ", err.message);
  });
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch((err) => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});
