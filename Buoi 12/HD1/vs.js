const user = {
  name: "Nguyễn Minh Quang",
  age: 20,
  major: "Công nghệ thông tin",
  skills: ["HTML5", "CSS3", "JavaScript", "SQL Server"],

  getBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  },

  introduce() {
    const birthYear = this.getBirthYear();
    return `Xin chào, mình là ${this.name}, ${this.age} tuổi (sinh năm ${birthYear}), ngành ${this.major}. Kỹ năng: ${this.skills.join(", ")}.`;
  }
};

console.log(user.introduce());
console.log("Năm sinh dự tính:", user.getBirthYear());