const simpleForm = document.getElementById("simpleForm");

simpleForm.addEventListener("submit", function (event) {
  // Ngăn trình duyệt tải lại trang theo hành vi mặc định của Form
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  console.log("Trang không bị tải lại! Dữ liệu nhận được:", { fullName });
});