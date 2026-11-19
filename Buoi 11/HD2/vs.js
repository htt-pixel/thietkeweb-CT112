const registerForm = document.getElementById("registerForm");

function setError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add("input-error");
}

function clearError(inputEl, errorEl) {
  errorEl.textContent = "";
  inputEl.classList.remove("input-error");
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  // 1. Kiểm tra username (< 5 ký tự)
  if (usernameInput.value.trim().length < 5) {
    setError(usernameInput, usernameError, "Tên quá ngắn (tối thiểu 5 ký tự)");
    isValid = false;
  } else {
    clearError(usernameInput, usernameError);
  }

  // 2. Kiểm tra Email (không có chữ "@")
  const emailVal = emailInput.value.trim();
  if (!emailVal || !emailVal.includes("@")) {
    setError(emailInput, emailError, "Email không hợp lệ (phải chứa ký tự '@')");
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // 3. Kiểm tra Mật khẩu (không được để trống)
  if (passwordInput.value.trim() === "") {
    setError(passwordInput, passwordError, "Mật khẩu không được để trống");
    isValid = false;
  } else {
    clearError(passwordInput, passwordError);
  }

  if (isValid) {
    alert("Đăng ký hợp lệ!");
    console.log("Dữ liệu hợp lệ:", {
      username: usernameInput.value.trim(),
      email: emailVal,
      password: passwordInput.value
    });
  }
});