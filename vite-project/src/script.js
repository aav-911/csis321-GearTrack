/* MOBILE NAVIGATION */

const hamburger = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
