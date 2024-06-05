//Set Up Materialize Components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var collapsibles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsibles);

  var sidenav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sidenav);

  const postCards = document.querySelectorAll(".post-card");
  postCards.forEach((card) => {
    card.addEventListener("click", () => {
      postCards.forEach((c) => c.classList.add("hidden"));
      card.classList.remove("hidden");
    });
  });
});
