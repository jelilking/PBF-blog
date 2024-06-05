const postList = document.querySelector(".post-grid");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

export const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loggedInLinks.forEach((item) => {
      item.style.display = "block";
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    //toggle UI elements
    loggedInLinks.forEach((item) => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach((item) => {
      item.style.display = "block";
    });
  }
};

//SETING UP THE POSTS
//setup posts
export const setupPosts = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((doc) => {
      const post = doc.data();
      console.log(post);
      const div = ` 
          <div class="post-card card">
                <div class="card-content">
                    <span class="card-title" style="font-weight: 700;">
                    ${post.title}
                    </span>
                </div>
                <div class="card-image">
                    <!-- <img src="image-url-3.jpg" alt="Post Image"> -->
                </div>
                <div class="card-content">
                    <p>${post.content}</p>
                </div>
            </div>
            `;
      html += div;
    });

    postList.innerHTML = html;

    const postCards = document.querySelectorAll(".post-card");
    postCards.forEach((card) => {
      card.addEventListener("click", () => {
        postCards.forEach((c) => c.classList.add("hidden"));
        card.classList.remove("hidden");
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

//Set Up Materialize Components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibles);

  var sidenav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenav);
});
