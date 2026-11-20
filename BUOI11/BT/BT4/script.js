const themeToggle = document.querySelector("#themeToggle");
const themeColor = document.querySelector("#themeColor");
const savedTheme = localStorage.getItem("portfolio-theme");
const savedColor = localStorage.getItem("portfolio-color");

if (savedTheme === "dark") document.body.classList.add("dark");
if (savedColor) {
  document.documentElement.style.setProperty("--primary", savedColor);
  themeColor.value = savedColor;
}
updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
});

themeColor.addEventListener("input", event => {
  const color = event.target.value;
  document.documentElement.style.setProperty("--primary", color);
  localStorage.setItem("portfolio-color", color);
});

function updateThemeButton() {
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light mode" : "🌙 Dark mode";
}
