import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { colUserRef } from "./auth.js";

const postList = document.querySelector(".post-grid");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accoutDetails = document.querySelector(".account-details");

const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
});

//ADD ADMIN FUNCTIONS
export const createAdmin = (user) => {
  const admin = document.querySelectorAll(".admin");
  console.log(admin);
  if (
    user.email === "ozigi@gmail.com" ||
    user.email === "Malikraid8@gmail.com"
  ) {
    admin.forEach((item) => {
      item.style.display = "block";
    });
  } else {
    admin.forEach((item) => {
      item.style.display = "none";
    });
  }
};

export const setupUI = (user) => {
  if (user) {
    //account info
    const getdoc = doc(colUserRef, user.uid);
    getDoc(getdoc).then((doc) => {
      const html = `
    <div>Logged in as ${user.email}</div>
    <div>${doc.data().bio}</div>
    `;

      accoutDetails.innerHTML = html;
    });

    // Toggle UI elements
    loggedInLinks.forEach((item) => {
      item.style.display = "block";
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    //hide account info
    accoutDetails.innerHTML = "";

    // Toggle UI elements
    loggedInLinks.forEach((item) => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = "block";
    });
  }
};

// SETTING UP THE POSTS
export const setupPosts = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);

      const isLongContent = post.content.length > 20;
      const displayContent = isLongContent
        ? post.content.substring(0, 50) + "..."
        : post.content;

      const div = ` 
          <div class="post-card card">
                <div class="card-content">
                    <span class="card-title" style="font-weight: 700;">
                    ${post.title}
                    </span>
                </div>
                <div class="card-image">
                    <img src="${post.imageURL}" alt="Post Image">
                </div>
                <div class="card-content">
                    <p class="post-content">${displayContent}</p>
                    ${
                      isLongContent
                        ? '<button class="show-more">Show More</button>'
                        : ""
                    }
                    <p class="full-content hidden">${post.content}</p>
                </div>
            </div>
            `;
      html += div;
    });

    postList.innerHTML = html;

    const showMoreButtons = document.querySelectorAll(".show-more");
    showMoreButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const cardContent = e.target.closest(".card-content");
        const postContent = cardContent.querySelector(".post-content");
        const fullContent = cardContent.querySelector(".full-content");

        postContent.classList.toggle("hidden");
        fullContent.classList.toggle("hidden");

        if (fullContent.classList.contains("hidden")) {
          button.textContent = "Show More";
        } else {
          button.textContent = "Show Less";
        }
      });
    });
  } else {
    postList.innerHTML = ` 
          <div class="post-card card">
                <div class="card-content center">
                    <span class="card-title" style="font-weight: 700;">
                    Login to view posts
                    </span>
                </div>
            </div>
            `;
  }
};

// Set Up Materialize Components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibles);

  var sidenav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenav);
});
