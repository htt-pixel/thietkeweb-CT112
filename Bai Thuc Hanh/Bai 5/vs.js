document.addEventListener("DOMContentLoaded", function () {
  
  // ==========================================
  // BƯỚC 2: DARK / LIGHT MODE LOGIC
  // ==========================================
  const toggleThemeBtn = document.getElementById("toggleThemeBtn");
  const bodyElement = document.body;

  // Khôi phục trạng thái theme từ LocalStorage khi tải trang[cite: 2]
  const savedThemeMode = localStorage.getItem("app_theme_mode");
  if (savedThemeMode === "dark") {
    bodyElement.classList.add("dark-theme");
  }

  toggleThemeBtn.addEventListener("click", function () {
    bodyElement.classList.toggle("dark-theme");
    
    // Lưu trạng thái vào LocalStorage[cite: 2]
    if (bodyElement.classList.contains("dark-theme")) {
      localStorage.setItem("app_theme_mode", "dark");
    } else {
      localStorage.setItem("app_theme_mode", "light");
    }
  });


  // ==========================================
  // BƯỚC 3: BRAND SWITCHER LOGIC (Eco, Luxury, Cyberpunk)
  // ==========================================
  const brandButtons = document.querySelectorAll(".brand-btn");
  const heroTitle = document.getElementById("heroTitle");
  const heroSubtitle = document.getElementById("heroSubtitle");
  const heroBtn = document.getElementById("heroBtn");

  // Dữ liệu cấu hình cho từng Brand Style
  const brandData = {
    eco: {
      primaryColor: "#2e7d32",
      bgColor: "#f1f8e9",
      fontMain: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      title: "Sống Xanh & Phát Triển Bền Vững",
      subtitle: "Khám phá các giải pháp thân thiện với môi trường, hướng tới một tương lai xanh sạch và an toàn hơn cho hành tinh của chúng ta.",
      buttonText: "Khám Phá Ngay"
    },
    luxury: {
      primaryColor: "#c5a059", // Màu vàng hoàng gia
      bgColor: "#0f0f0f",
      fontMain: "'Playfair Display', Georgia, serif",
      title: "Đẳng Cấp Thượng Lưu & Tinh Tế",
      subtitle: "Trải nghiệm không gian xa hoa, thiết kế độc bản cùng dịch vụ đặc quyền dành riêng cho giới tinh hoa.",
      buttonText: "Trải Nghiệm Ngay"
    },
    cyberpunk: {
      primaryColor: "#00f0ff", // Xanh neon
      bgColor: "#05050a",
      fontmain: "'Courier New', Courier, monospace",
      title: "Tương Lai Số & Công Nghệ Cyber",
      subtitle: "Dấn thân vào thế giới ngầm kỹ thuật số năm 2077, nơi mạng lưới neon và hệ thống AI thống trị thực tại.",
      buttonText: "Kết Nối Ngay"
    }
  };

  brandButtons.forEach(button => {
    button.addEventListener("click", function () {
      // 1. Cập nhật trạng thái Active trên nút bấm
      brandButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // 2. Lấy tên brand được chọn
      const selectedBrand = this.getAttribute("data-brand");
      const config = brandData[selectedBrand];

      if (config) {
        // 3. Cập nhật Dynamic CSS Variables bằng document.documentElement.style.setProperty()
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--primary-color", config.primaryColor);
        rootStyle.setProperty("--bg-color", config.bgColor);
        rootStyle.setProperty("--font-main", config.fontMain);

        // 4. Thay đổi nội dung Text (Headline, Subtitle, Button) tương ứng
        heroTitle.textContent = config.title;
        heroSubtitle.textContent = config.subtitle;
        heroBtn.textContent = config.buttonText;
      }
    });
  });

});