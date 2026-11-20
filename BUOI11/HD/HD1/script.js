
const form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {

    // Ngăn trang web tải lại
    event.preventDefault();

    // Lấy dữ liệu từ input
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    // In dữ liệu ra Console
    console.log("Họ và tên:", username);
    console.log("Email:", email);

    console.log("Đã gửi Form thành công!");
});
  