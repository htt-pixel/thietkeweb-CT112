
const user = {
    name: "Minh",
    age: 20,
    major: "Công nghệ thông tin",

    skills: ["HTML", "CSS", "JavaScript"],

    // Phương thức giới thiệu bản thân
    introduce: function() {
        return `Xin chào! Mình tên là ${this.name},
        năm nay ${this.age} tuổi.
        Mình đang học ngành ${this.major}.`;
    },

    // Phương thức tính năm sinh
    getBirthYear: function() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.age;
    }
};

function showUser() {
    console.log(user.introduce());
    console.log("Năm sinh dự kiến:", user.getBirthYear());

    document.getElementById("result").innerHTML = `
        <h3>Thông tin cá nhân</h3>
        <p><b>Họ tên:</b> ${user.name}</p>
        <p><b>Tuổi:</b> ${user.age}</p>
        <p><b>Chuyên ngành:</b> ${user.major}</p>
        <p><b>Kỹ năng:</b> ${user.skills.join(", ")}</p>
        <p><b>Năm sinh dự kiến:</b> ${user.getBirthYear()}</p>
        <p>${user.introduce()}</p>
    `;
}
