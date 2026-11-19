import { STUDENTS_DATA } from "../data/data.js";
import { convertToGPA4, filterStudents, validateSupportForm } from "./logic.js";

const tableBody = document.querySelector("#acad-student-tbody");
const searchInput = document.querySelector("#acad-search-input");
const supportForm = document.querySelector("#acad-support-form");

// 1. Đổ dữ liệu từ Object JSON ra bảng
function renderStudentTable(list) {
  if (!tableBody) return;
  if (list.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">Không tìm thấy sinh viên phù hợp.</td></tr>`;
    return;
  }

  tableBody.innerHTML = list
    .map((sv) => {
      const gpa4 = convertToGPA4(sv.gpa10).toFixed(1);
      return `
        <tr>
          <td>${sv.id}</td>
          <td>${sv.name}</td>
          <td>${sv.gpa10}</td>
          <td><strong>${gpa4}</strong></td>
          <td>${sv.failedCourses}</td>
        </tr>
      `;
    })
    .join("");
}

// 2. Tối ưu tìm kiếm với Debounce (tránh render lại liên tục mỗi phím gõ)
let debounceTimer;
searchInput?.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const filtered = filterStudents(STUDENTS_DATA, e.target.value);
    renderStudentTable(filtered);
  }, 250);
});

// 3. Bắt sự kiện Form Validation
supportForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const studentId = supportForm.elements["studentId"].value;
  const message = supportForm.elements["message"].value;

  const { isValid, errors } = validateSupportForm({ studentId, message });
  const errorBox = document.querySelector("#acad-form-error");

  if (!isValid) {
    errorBox.textContent = Object.values(errors).join(" | ");
    return;
  }

  errorBox.textContent = "";
  alert("Gửi yêu cầu hỗ trợ học vụ thành công!");
  supportForm.reset();
});

// Khởi chạy dữ liệu ban đầu
renderStudentTable(STUDENTS_DATA);