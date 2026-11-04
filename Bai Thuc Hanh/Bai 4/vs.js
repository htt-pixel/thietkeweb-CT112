document.addEventListener("DOMContentLoaded", function() {
  
  // --- BƯỚC 2: INTERSECTION OBSERVER CHO SCROLL REVEAL ---
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });


  // --- BƯỚC 3: TƯƠNG TÁC ĐỔI MÀU XE ĐIỆN ---
  const colorButtons = document.querySelectorAll(".color-btn");
  const carImage = document.getElementById("carImage");

  colorButtons.forEach(button => {
    button.addEventListener("click", function() {
      colorButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      const newImgSrc = this.getAttribute("data-img");
      carImage.classList.add("fade");

      setTimeout(() => {
        carImage.src = newImgSrc;
        carImage.classList.remove("fade");
      }, 350);
    });
  });


  // --- TÍNH NĂNG TÌM KIẾM NỘI DUNG (SEARCH FEATURE) ---
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const featureCards = document.querySelectorAll(".feature-card");

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    featureCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (query && text.includes(query)) {
        card.style.borderColor = "#00d2ff";
        card.style.boxShadow = "0 0 20px rgba(0, 210, 255, 0.5)";
        if (!found) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          found = true;
        }
      } else {
        card.style.borderColor = "rgba(255, 255, 255, 0.1)";
        card.style.boxShadow = "none";
      }
    });

    if (query && !found) {
      alert("Không tìm thấy nội dung phù hợp với từ khóa: \"" + query + "\"");
    }
  }

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });


  // --- BƯỚC 4: HIỆU ỨNG RUNG CHU KỲ 5 GIÂY CHO NÚT ZALO ---
  const zaloBtn = document.getElementById("zaloBtn");
  
  setInterval(() => {
    zaloBtn.style.animation = "none";
    void zaloBtn.offsetWidth;
    zaloBtn.style.animation = "zaloShake 1s ease infinite";
  }, 5000);
});