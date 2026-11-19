const spaServices = [
  { id: "s1", name: "Massage tinh dầu thảo dược", category: "massage", duration: 60, price: 320000 },
  { id: "s2", name: "Massage foot thư giãn", category: "massage", duration: 45, price: 210000 },
  { id: "s3", name: "Chăm sóc da chuyên sâu", category: "skincare", duration: 75, price: 450000 }
];

let selectedServices = [];

function formatMoney(number) {
  return number.toLocaleString("vi-VN") + "đ";
}

function addServiceToBooking(serviceId) {
  const found = spaServices.find((item) => item.id === serviceId);
  if (!found) return;
  const exists = selectedServices.some((item) => item.id === serviceId);
  if (!exists) {
    selectedServices.push(found);
  }
  updateBookingUI();
}

function removeServiceFromBooking(serviceId) {
  selectedServices = selectedServices.filter((item) => item.id !== serviceId);
  updateBookingUI();
}

function calculateBookingTotals(items) {
  return items.reduce(
    (acc, service) => {
      acc.totalCost += service.price;
      acc.totalTime += service.duration;
      return acc;
    },
    { totalCost: 0, totalTime: 0 }
  );
}

function validateBookingInputs(name, phone) {
  let valid = true;
  const nameErr = document.getElementById("bp-name-err");
  const mobileErr = document.getElementById("bp-mobile-err");

  nameErr.textContent = "";
  mobileErr.textContent = "";

  if (name.trim().length < 2) {
    nameErr.textContent = "Vui lòng nhập họ và tên hợp lệ.";
    valid = false;
  }

  if (!/^0\d{9}$/.test(phone.trim())) {
    mobileErr.textContent = "Số điện thoại phải gồm 10 chữ số.";
    valid = false;
  }

  if (selectedServices.length === 0) {
    mobileErr.textContent = "Vui lòng chọn ít nhất một dịch vụ.";
    valid = false;
  }

  return valid;
}

function renderServiceCatalog() {
  const container = document.getElementById("bp-service-list");
  container.innerHTML = spaServices
    .map(
      (srv) => `
      <article class="bp-card">
        <h3>${srv.name}</h3>
        <p>Thời lượng: ${srv.duration} phút</p>
        <p>Giá: ${formatMoney(srv.price)}</p>
        <button type="button" onclick="addServiceToBooking('${srv.id}')">Thêm vào lịch</button>
      </article>
    `
    )
    .join("");
}

function updateBookingUI() {
  const listEl = document.getElementById("bp-selected-items");
  const { totalCost, totalTime } = calculateBookingTotals(selectedServices);

  listEl.innerHTML = selectedServices.length
    ? selectedServices
        .map(
          (item) => `
          <li class="bp-selected-row">
            <span>${item.name}</span>
            <button type="button" onclick="removeServiceFromBooking('${item.id}')">Gỡ</button>
          </li>
        `
        )
        .join("")
    : "<li>Chưa có dịch vụ nào được chọn.</li>";

  document.getElementById("bp-total-time").textContent = totalTime;
  document.getElementById("bp-total-cost").textContent = formatMoney(totalCost);
}

document.getElementById("bp-checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("bp-fullname").value;
  const phone = document.getElementById("bp-mobile").value;
  const resultEl = document.getElementById("bp-result");
  resultEl.textContent = "";

  if (validateBookingInputs(name, phone)) {
    const { totalCost, totalTime } = calculateBookingTotals(selectedServices);
    resultEl.textContent = `Đã ghi nhận lịch cho ${name.trim()} (${totalTime} phút - ${formatMoney(totalCost)}).`;
  }
});

renderServiceCatalog();
updateBookingUI();