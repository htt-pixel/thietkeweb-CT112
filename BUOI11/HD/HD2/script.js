
const form = document.getElementById("registerForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Xóa thông báo lỗi cũ
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    email.classList.remove("invalid");
    password.classList.remove("invalid");

    let isValid = true;

    // Kiểm tra Email
    if (!email.value.includes("@")) {
        emailError.textContent = "Email phải có ký tự @";
        email.classList.add("invalid");
        isValid = false;
    }

    // Kiểm tra mật khẩu
    if (password.value.trim() === "") {
        passwordError.textContent = "Vui lòng nhập mật khẩu";
        password.classList.add("invalid");
        isValid = false;
    }

    // Nếu tất cả hợp lệ
    if (isValid) {
        successMessage.textContent = "Đăng ký thành công!";
        console.log("Email:", email.value);
        console.log("Mật khẩu:", password.value);
    }
});
  