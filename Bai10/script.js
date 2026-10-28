const toggleButton = document.querySelector("#toggle-btn");
toggleButton.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  toggleButton.setAttribute("aria-pressed", String(isDarkMode));
});

const liveInput = document.querySelector("#live-input");
const liveHeading = document.querySelector("#live-heading");
liveInput.addEventListener("input", () => {
  liveHeading.textContent = liveInput.value;
});

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

function setMenuOpen(isOpen) {
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNavigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

AOS.init({
  duration: 700,
  offset: 80,
  once: true
});