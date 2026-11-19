// 1. Quy đổi điểm hệ 10 sang hệ 4 & xếp loại (Pure Function)
export function convertToGPA4(gpa10) {
  if (gpa10 >= 8.5) return 4.0;
  if (gpa10 >= 7.0) return 3.0;
  if (gpa10 >= 5.5) return 2.0;
  if (gpa10 >= 4.0) return 1.0;
  return 0.0;
}

// 2. Bộ lọc tìm kiếm theo tên hoặc MSSV (Không phân biệt hoa thường)
export function filterStudents(students, keyword) {
  const cleanKey = keyword.trim().toLowerCase();
  if (!cleanKey) return students;

  return students.filter(
    (sv) =>
      sv.name.toLowerCase().includes(cleanKey) ||
      sv.id.toLowerCase().includes(cleanKey)
  );
}

// 3. Form Validation: Kiểm tra MSSV 8 chữ số và nội dung hỗ trợ
export function validateSupportForm({ studentId, message }) {
  const idPattern = /^\d{8}$/; // Ví dụ: 12500101
  const errors = {};

  if (!idPattern.test(studentId.trim())) {
    errors.studentId = "MSSV phải gồm đúng 8 chữ số.";
  }
  if (message.trim().length < 10) {
    errors.message = "Nội dung yêu cầu cần tối thiểu 10 ký tự.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}