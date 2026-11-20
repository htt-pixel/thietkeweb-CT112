// 1. Typewriter effect
const typedText = document.querySelector("#typedText");
const words = ["Minh.", "một Web Developer tương lai.", "người luôn học hỏi."];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  typedText.textContent = currentWord.slice(0, charIndex);

  if (!deleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeWriter, 95);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeWriter, 45);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWriter, 700);
  }
}
typeWriter();

// 2. Scroll reveal: chỉ hiện hiệu ứng khi phần tử đi vào màn hình.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// 3. Filter project cards by category.
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach(card => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});
