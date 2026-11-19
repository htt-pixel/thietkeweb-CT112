# 🎓 Hệ Thống Quản Lý Học Vụ Sinh Viên (MVP)

Ứng dụng web hỗ trợ tra cứu điểm số, quy đổi GPA hệ 4 tự động và gửi yêu cầu hỗ trợ học vụ trực tuyến — được phát triển theo quy trình **Agile/Scrum & AI Vibe Coding**.

🔗 **Live Demo:** `https://<username>.github.io/<ten-repo>/`

## ✨ Tính năng chính
- **Đổ dữ liệu tự động:** Hiển thị danh sách sinh viên và điểm số từ nguồn dữ liệu chuẩn `STUDENTS_DATA`.
- **Quy đổi GPA thông minh:** Tự động tính điểm hệ 4 từ điểm hệ 10 theo chuẩn đào tạo.
- **Bộ lọc tìm kiếm tức thì:** Tìm theo Tên hoặc MSSV (tích hợp Debounce tối ưu hiệu năng).
- **Kiểm tra dữ liệu Form (Validation):** Xác thực định dạng MSSV bằng RegEx trước khi gửi yêu cầu.

## 🗂 Cấu trúc thư mục
├── index.html          # Khung giao diện chính
├── css/style.css       # Hệ thống biến :root & layout responsive
├── data/data.js        # Data Contract dùng chung toàn nhóm
├── js/logic.js         # Pure Functions xử lý nghiệp vụ
├── js/features.js      # Kết nối sự kiện DOM
└── prompt_log.md       # Nhật ký tương tác & sửa lỗi cùng AI

## 🤖 Danh sách Prompt tiêu biểu đã sử dụng
1. **Tạo Data Contract:** *"Tạo mảng dữ liệu mẫu STUDENTS_DATA bằng JavaScript gồm các trường id, name, gpa10, credits, failedCourses cho 10 sinh viên."*
2. **Viết Pure Functions:** *"Viết hàm JS thuần túy quy đổi điểm hệ 10 sang hệ 4 và hàm lọc sinh viên theo tên hoặc MSSV, không can thiệp DOM."*
3. **Tối ưu & Validation:** *"Bổ sung RegEx kiểm tra MSSV 8 chữ số cho form hỗ trợ học vụ và thêm debounce 250ms cho ô tìm kiếm."*

## 👥 Thành viên nhóm
- **Nguyễn Văn A** — UI/UX & CSS Architecture
- **Trần Thị B** — Data Contract & Business Logic
- **Lê Văn C** — DOM Integration & Testing