let name="Cam Quốc Thịnh";
let age=20;
console.log("Tên: " + name);
console.log("Tuổi: " + age);
console.log("10 + 10 = " + (10 + 10));
console.log("10 - 10 = " + (10 - 10));
console.log("10 * 10 = " + (10 * 10));
console.log("10 / 10 = " + (10 / 10));

let diem =prompt("Nhập điểm số của bạn:");
if (diem > 8) {
    alert("Xếp loại: Giỏi");
} else if (diem > 6.5) {
    alert("Xếp loại: Khá");
} else if (diem >= 5) {
    alert("Xếp loại: Trung bình");
} else {
    alert("Xếp loại: Yếu");
}