/**
 * ========================================================
 * VALOR GAMING HUB - REAL-TIME GREETING NOTIFICATION
 * Tích hợp thông báo chào mừng theo thời gian thực
 * ========================================================
 */

// Cấu hình: Đổi USE_ALERT = true nếu giảng viên yêu cầu popup alert() mặc định
const USE_ALERT = false;

function initRealtimeGreeting() {
    const now = new Date();
    const currentHour = now.getHours();

    let greetingTitle = "";
    let greetingMsg = "";
    let iconClass = "";

    // Phân loại lời chào theo khung giờ trong ngày
    if (currentHour >= 5 && currentHour < 12) {
        // Từ 05:00 đến 11:59
        greetingTitle = "Chào buổi sáng!";
        greetingMsg = "Chúc bạn một ngày mới tràn đầy năng lượng cùng VALOR Gaming Hub!";
        iconClass = "fa-solid fa-sun";
    } else if (currentHour >= 12 && currentHour < 18) {
        // Từ 12:00 đến 17:59
        greetingTitle = "Chào buổi chiều!";
        greetingMsg = "Chúc bạn một buổi chiều làm việc và giải trí hiệu quả!";
        iconClass = "fa-solid fa-cloud-sun";
    } else {
        // Từ 18:00 đến 04:59 hôm sau
        greetingTitle = "Chào buổi tối!";
        greetingMsg = "Chúc bạn có những giờ phút thư giãn và leo rank đỉnh cao!";
        iconClass = "fa-solid fa-moon";
    }

    // Cách 1: Sử dụng alert() nếu được chỉ định
    if (USE_ALERT) {
        alert(`${greetingTitle} ${greetingMsg}`);
        return;
    }

    // Cách 2: Hiển thị thông báo Toast hiện đại, hài hòa với giao diện Gaming
    createGreetingToast(greetingTitle, greetingMsg, iconClass);
}

/**
 * Hàm khởi tạo và hiển thị thông báo dạng Toast nổi bật trên giao diện
 */
function createGreetingToast(title, message, iconClass) {
    const toast = document.createElement("div");
    toast.className = "welcome-toast";
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
        <div class="welcome-toast-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="welcome-toast-content">
            <div class="welcome-toast-title">${title}</div>
            <div class="welcome-toast-msg">${message}</div>
        </div>
        <button class="welcome-toast-close" aria-label="Đóng thông báo">&times;</button>
    `;

    document.body.appendChild(toast);

    // Kích hoạt animation trượt vào sau 300ms
    setTimeout(() => {
        toast.classList.add("show");
    }, 300);

    // Hàm đóng toast mượt mà
    const dismissToast = () => {
        toast.classList.remove("show");
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    };

    // Bắt sự kiện khi bấm nút đóng (x)
    const closeBtn = toast.querySelector(".welcome-toast-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", dismissToast);
    }

    // Tự động đóng thông báo sau 5 giây để không làm phiền người dùng
    setTimeout(dismissToast, 5000);
}

// Chạy mã khi tài liệu HTML đã sẵn sàng
document.addEventListener("DOMContentLoaded", initRealtimeGreeting);



