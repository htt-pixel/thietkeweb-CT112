const profileForm = document.getElementById("profileForm");
const outputEl = document.getElementById("output");

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 1. Lấy dữ liệu text/email
  const fullName = document.getElementById("name").value.trim();
  const email = document.getElementById("userEmail").value.trim();

  // 2. Lấy dữ liệu Radio button (Giới tính đang được chọn)
  const selectedGenderEl = document.querySelector('input[name="gender"]:checked');
  const gender = selectedGenderEl ? selectedGenderEl.value : "Chưa chọn";

  // 3. Lấy dữ liệu Checkbox (Danh sách các sở thích được tick)
  const checkedHobbies = document.querySelectorAll('input[name="hobbies"]:checked');
  const hobbies = Array.from(checkedHobbies).map((checkbox) => checkbox.value);

  // 4. Đóng gói thành Object dữ liệu người dùng hoàn chỉnh
  const userData = {
    fullName,
    email,
    gender,
    hobbies,
    submittedAt: new Date().toLocaleString("vi-VN")
  };

  console.log("Object dữ liệu người dùng:", userData);
  outputEl.textContent = JSON.stringify(userData, null, 2);
});