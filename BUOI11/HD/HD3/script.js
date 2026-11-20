
const form = document.getElementById("userForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Lấy họ tên
    const fullname = document.getElementById("fullname").value;

    // Lấy giới tính được chọn
    const selectedGender = document.querySelector(
        'input[name="gender"]:checked'
    );

    const gender = selectedGender
        ? selectedGender.value
        : "Chưa chọn";

    // Lấy danh sách sở thích được chọn
    const selectedHobbies = document.querySelectorAll(
        'input[name="hobby"]:checked'
    );

    const hobbies = [];

    selectedHobbies.forEach(function(item) {
        hobbies.push(item.value);
    });

    // Tạo Object người dùng
    const user = {
        fullname: fullname,
        gender: gender,
        hobbies: hobbies
    };

    // Hiển thị kết quả
    console.log(user);

    document.getElementById("result").textContent =
        JSON.stringify(user, null, 4);
});
  