import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { colUserRef } from "./auth.js";

const postList = document.querySelector(".post-grid");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  // Your code to make the user an admin goes here
});

export const createAdmin = (user) => {
  const admin = document.querySelectorAll(".admin");
  if (
    user.email === "ozigi@gmail.com" ||
    user.email === "malikraid8@gmail.com"
  ) {
    admin.forEach((item) => (item.style.display = "block"));
  } else {
    admin.forEach((item) => (item.style.display = "none"));
  }
};

export const setupUI = (user) => {
  const getdoc = user ? doc(colUserRef, user.uid) : null; // Check if user exists
  if (getdoc) {
    getDoc(getdoc).then((doc) => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
      `;
      accountDetails.innerHTML = html;
    });
  } else {
    accountDetails.innerHTML = "";
  }

  loggedInLinks.forEach(
    (item) => (item.style.display = user ? "block" : "none")
  ); // Show logged-in links if user exists
  loggedOutLinks.forEach(
    (item) => (item.style.display = user ? "none" : "block")
  ); // Show logged-out links if user does not exist
};

let viewCount = 0; // Track the number of viewed posts
const viewLimit = 7; // Set the limit for free views

export const setupPosts = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((doc, index) => {
      const post = doc.data();
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

    // Add event listener to each post card
    const postCards = document.querySelectorAll(".post-card");
    postCards.forEach((card) => {
      card.addEventListener("click", () => {
        viewCount++;
        if (viewCount >= viewLimit) {
          const modal = document.querySelector("#modal-login-notification");
          M.Modal.getInstance(modal).open();
          viewCount = 0; // Reset the view count after showing the notification
        }
      });
    });
  } else {
    postList.innerHTML = `
            <div class="post-card card">
                <div class="card-content center">
                    <span class="card-title" style="font-weight: 700;">No posts available</span>
                </div>
            </div>
        `;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibles);

  var sidenav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenav);

  const notifyLoginBtn = document.querySelector("#notify-login-btn");
  notifyLoginBtn.addEventListener("click", () => {
    const modalLogin = document.querySelector("#modal-login");
    M.Modal.getInstance(modalLogin).open();
  });

  const notifySignupBtn = document.querySelector("#notify-signup-btn");
  notifySignupBtn.addEventListener("click", () => {
    const modalSignup = document.querySelector("#modal-signup");
    M.Modal.getInstance(modalSignup).open();
  });
});
