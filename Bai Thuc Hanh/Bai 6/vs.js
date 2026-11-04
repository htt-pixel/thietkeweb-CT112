document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // BƯỚC 1: CUSTOM CURSOR LOGIC
  // ==========================================
  const customCursor = document.getElementById("customCursor");

  document.addEventListener("mousemove", function (e) {
    // Cập nhật vị trí clientX và clientY cho vòng tròn cursor
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });


  // ==========================================
  // BƯỚC 2: PARALLAX SCROLL LOGIC (Optimized with rAF)
  // ==========================================
  const parallaxBg = document.getElementById("parallaxBg");
  let isTicking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    // Kiểm tra nếu Hero Section nằm trong khu vực viewport để tối ưu hiệu năng
    if (scrollY <= window.innerHeight) {
      // Nhân với hệ số 0.5 để tạo tốc độ dịch chuyển chậm hơn scroll thông thường
      parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
    isTicking = false;
  }

  window.addEventListener("scroll", function () {
    if (!isTicking) {
      window.requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  });


  // ==========================================
  // BƯỚC 3: MAGNETIC BUTTON LOGIC
  // ==========================================
  const magneticBtn = document.getElementById("magneticBtn");
  const DISTANCE_THRESHOLD = 100; // Bán kính kích hoạt hiệu ứng hút (100px)
  let isMagneticTicking = false;
  let mousePos = { x: 0, y: 0 };

  document.addEventListener("mousemove", function (e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    if (!isMagneticTicking) {
      window.requestAnimationFrame(processMagneticEffect);
      isMagneticTicking = true;
    }
  });

  function processMagneticEffect() {
    const rect = magneticBtn.getBoundingClientRect();
    
    // 1. Tính toán tọa độ tâm của nút
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Khoảng cách giữa con trỏ chuột và tâm nút
    const deltaX = mousePos.x - btnCenterX;
    const deltaY = mousePos.y - btnCenterY;
    const distance = Math.hypot(deltaX, deltaY);

    // 2. Nếu khoảng cách < 100px, dịch chuyển nút theo vị trí con trỏ chuột
    if (distance < DISTANCE_THRESHOLD) {
      magneticBtn.classList.remove("reset-transition");
      
      // Sử dụng trọng số nhẹ (0.35) để lực hút tự nhiên
      const pullX = deltaX * 0.35;
      const pullY = deltaY * 0.35;

      magneticBtn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    } else {
      // Khi con trỏ chuột nằm ngoài vùng 100px, đàn hồi mượt về (0,0)
      resetMagneticButton();
    }

    isMagneticTicking = false;
  }

  // 3. Khi mouseleave khỏi nút hoặc ra khỏi bán kính hút
  magneticBtn.addEventListener("mouseleave", resetMagneticButton);

  function resetMagneticButton() {
    magneticBtn.classList.add("reset-transition");
    magneticBtn.style.transform = `translate(0px, 0px)`;
  }

});