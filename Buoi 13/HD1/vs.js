const pitchServices = [
  { id: 1, name: "Massage đá nóng", category: "massage", duration: 60, price: 350000 },
  { id: 2, name: "Massage cổ vai gáy", category: "massage", duration: 45, price: 220000 },
  { id: 3, name: "Chăm sóc da cấp ẩm", category: "skincare", duration: 60, price: 400000 }
];

let selectedServiceIds = [];
let currentCategory = "all";
let currentKeyword = "";

function formatVND(val) {
  return val.toLocaleString("vi-VN") + "đ";
}

function renderPitchServices() {
  const listEl = document.getElementById("pitch-services");
  const filtered = pitchServices.filter((s) => {
    const okCat = currentCategory === "all" || s.category === currentCategory;
    const okKey = s.name.toLowerCase().includes(currentKeyword.toLowerCase());
    return okCat && okKey;
  });

  listEl.innerHTML = filtered
    .map(
      (s) => `
      <div class="pitch-card">
        <h3>${s.name}</h3>
        <p>${s.duration} phút - ${formatVND(s.price)}</p>
        <button type="button" onclick="togglePitchService(${s.id})">
          ${selectedServiceIds.includes(s.id) ? "Bỏ chọn" : "Chọn gói"}
        </button>
      </div>
    `
    )
    .join("");
}

function togglePitchService(id) {
  if (selectedServiceIds.includes(id)) {
    selectedServiceIds = selectedServiceIds.filter((item) => item !== id);
  } else {
    selectedServiceIds.push(id);
  }
  renderPitchServices();
  renderPitchSummary();
}

function renderPitchSummary() {
  const cartEl = document.getElementById("pitch-cart");
  const chosen = pitchServices.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = chosen.reduce((acc, s) => acc + s.price, 0);
  const totalDuration = chosen.reduce((acc, s) => acc + s.duration, 0);

  cartEl.innerHTML = chosen.length
    ? chosen.map((s) => `<li>${s.name} (${formatVND(s.price)})</li>`).join("")
    : "<li>Chưa chọn dịch vụ</li>";

  document.getElementById("pitch-duration").textContent = totalDuration;
  document.getElementById("pitch-total").textContent = formatVND(totalPrice);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderPitchServices();
  });
});

document.getElementById("pitch-search").addEventListener("input", (e) => {
  currentKeyword = e.target.value.trim();
  renderPitchServices();
});

document.getElementById("pitch-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.getElementById("pitch-phone").value.trim();
  const msg = document.getElementById("pitch-msg");

  if (!/^0\d{9}$/.test(phone)) {
    msg.textContent = "Số điện thoại chưa hợp lệ (cần 10 chữ số, bắt đầu bằng 0).";
    return;
  }
  if (selectedServiceIds.length === 0) {
    msg.textContent = "Vui lòng chọn ít nhất 1 dịch vụ.";
    return;
  }
  msg.textContent = "Hợp lệ! Sẵn sàng gửi yêu cầu đặt lịch.";
});

renderPitchServices();
renderPitchSummary();