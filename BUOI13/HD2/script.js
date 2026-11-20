
/* ==========================================
   TRAVEL GLASS
   WEATHER & TRAVEL PLANNER
========================================== */


/* ==========================================
   1. KHAI BÁO DỮ LIỆU VÀ DOM
========================================== */

// Mảng chứa toàn bộ lịch trình
let itineraries = [];

// ID của lịch trình đang chỉnh sửa
let editingId = null;

// Trang hiện tại
let currentPage = 1;


// Lấy các phần tử HTML
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const weatherMessage = document.getElementById("weatherMessage");
const weatherButton = document.getElementById("weatherButton");

const itineraryForm = document.getElementById("itineraryForm");
const itineraryList = document.getElementById("itineraryList");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEdit");
const formMessage = document.getElementById("formMessage");

const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const pageSizeSelect = document.getElementById("pageSize");


/* ==========================================
   2. HÀM HỖ TRỢ
========================================== */

// Chuyển dữ liệu thành chuỗi an toàn khi hiển thị HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}


// Định dạng ngày tháng
function formatDate(date) {
    if (!date) return "";

    const parts = date.split("-");

    if (parts.length !== 3) return date;

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


// Hiển thị thông báo
function showMessage(element, message, type = "") {
    element.textContent = message;
    element.className = "message";

    if (type) {
        element.classList.add(type);
    }
}


/* ==========================================
   3. WEATHER API
========================================== */

// Chuyển mã thời tiết thành mô tả
function getWeatherDescription(code) {
    if (code === 0) return "Trời quang đãng";

    if ([1, 2, 3].includes(code)) {
        return "Trời có mây";
    }

    if ([45, 48].includes(code)) {
        return "Sương mù";
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
        return "Mưa phùn";
    }

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "Trời mưa";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "Có tuyết";
    }

    if ([95, 96, 99].includes(code)) {
        return "Có giông bão";
    }

    return "Thời tiết chưa xác định";
}


// Lấy biểu tượng thời tiết
function getWeatherIcon(code) {
    if (code === 0) return "☀️";

    if ([1, 2, 3].includes(code)) return "⛅";

    if ([45, 48].includes(code)) return "🌫️";

    if ([51, 53, 55, 56, 57].includes(code)) {
        return "🌦️";
    }

    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return "🌧️";
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "❄️";
    }

    if ([95, 96, 99].includes(code)) return "⛈️";

    return "🌤️";
}


// Tìm thành phố và lấy tọa độ
async function getCityCoordinates(city) {

    const url =
        "https://geocoding-api.open-meteo.com/v1/search" +
        `?name=${encodeURIComponent(city)}` +
        "&count=1&language=vi&format=json";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Không thể tìm kiếm thành phố.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("Không tìm thấy thành phố này.");
    }

    return data.results[0];
}


// Lấy thông tin thời tiết
async function getWeather(city) {

    weatherButton.disabled = true;
    weatherButton.textContent = "Đang tải...";

    showMessage(
        weatherMessage,
        "Đang tải dữ liệu thời tiết...",
        "success"
    );

    weatherResult.innerHTML = `
        <div class="weather-placeholder">
            Đang kết nối đến máy chủ thời tiết...
        </div>
    `;

    try {

        // Bước 1: Tìm tọa độ thành phố
        const location = await getCityCoordinates(city);

        // Bước 2: Gọi API thời tiết
        const url =
            "https://api.open-meteo.com/v1/forecast" +
            `?latitude=${location.latitude}` +
            `&longitude=${location.longitude}` +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
            "&timezone=auto";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Không lấy được dữ liệu thời tiết.");
        }

        const data = await response.json();

        // Bước 3: Tạo Object thời tiết
        const current = data.current;

        const weather = {
            city: location.name,
            country: location.country,
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            condition: getWeatherDescription(current.weather_code),
            icon: getWeatherIcon(current.weather_code),
            code: current.weather_code
        };

        // Bước 4: Hiển thị thời tiết
        displayWeather(weather);

        // Bước 5: Đưa ra gợi ý
        getSmartSuggestions(weather.code);

        showMessage(
            weatherMessage,
            "Cập nhật thời tiết thành công!",
            "success"
        );

    } catch (error) {

        weatherResult.innerHTML = `
            <div class="weather-placeholder">
                ${escapeHTML(error.message)}
            </div>
        `;

        document.getElementById("suggestionBox").classList.add("hidden");

        showMessage(
            weatherMessage,
            error.message,
            "error"
        );

    } finally {

        weatherButton.disabled = false;
        weatherButton.textContent = "Tìm kiếm";
    }
}


// Hiển thị thời tiết
function displayWeather(weather) {

    weatherResult.innerHTML = `
        <div class="weather-main">

            <div>
                <h2>
                    ${escapeHTML(weather.city)},
                    ${escapeHTML(weather.country)}
                </h2>

                <p>${escapeHTML(weather.condition)}</p>

                <div class="weather-temperature">
                    ${weather.temperature}°C
                </div>
            </div>

            <div class="weather-icon">
                ${weather.icon}
            </div>

        </div>

        <div class="weather-details">

            <div class="weather-detail">
                <p>Độ ẩm</p>
                <strong>${weather.humidity}%</strong>
            </div>

            <div class="weather-detail">
                <p>Cảm giác như</p>
                <strong>${weather.feelsLike}°C</strong>
            </div>

            <div class="weather-detail">
                <p>Tốc độ gió</p>
                <strong>${weather.windSpeed} km/h</strong>
            </div>

        </div>
    `;
}


// Sự kiện tìm kiếm thời tiết
weatherForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showMessage(
            weatherMessage,
            "Vui lòng nhập tên thành phố.",
            "error"
        );

        return;
    }

    getWeather(city);
});


/* ==========================================
   4. SMART SUGGESTIONS
========================================== */

// Gợi ý hoạt động theo thời tiết
function getSmartSuggestions(code) {

    let suggestion = "";

    if ([61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {

        suggestion =
            "Thời tiết có mưa hoặc giông. Bạn nên ưu tiên bảo tàng, quán cà phê hoặc địa điểm trong nhà.";

    } else if ([0, 1].includes(code)) {

        suggestion =
            "Thời tiết khá đẹp. Đây là thời điểm phù hợp để đi dạo, tham quan và chụp ảnh ngoài trời.";

    } else if ([2, 3, 45, 48].includes(code)) {

        suggestion =
            "Trời nhiều mây hoặc có sương mù. Bạn nên chú ý tầm nhìn khi di chuyển.";

    } else if ([51, 53, 55, 56, 57].includes(code)) {

        suggestion =
            "Có mưa phùn. Bạn nên chuẩn bị áo khoác hoặc ô khi ra ngoài.";

    } else {

        suggestion =
            "Hãy kiểm tra điều kiện thời tiết trước khi bắt đầu chuyến đi.";
    }

    document.getElementById("suggestionText").textContent = suggestion;

    document.getElementById("suggestionBox").classList.remove("hidden");
}


/* ==========================================
   5. LOCAL STORAGE
========================================== */

const STORAGE_KEY = "travelGlassItineraries";


// Lưu dữ liệu
function saveToLocalStorage() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(itineraries)
    );
}


// Đọc dữ liệu
function loadFromLocalStorage() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        const parsedData = data ? JSON.parse(data) : [];

        if (!Array.isArray(parsedData)) {
            throw new Error("Dữ liệu không hợp lệ.");
        }

        // Kiểm tra từng phần tử trước khi sử dụng
        itineraries = parsedData.filter(function(item) {

            return (
                item &&
                Number.isFinite(Number(item.id)) &&
                typeof item.title === "string" &&
                typeof item.city === "string" &&
                typeof item.date === "string" &&
                typeof item.time === "string"
            );

        }).map(function(item) {

            return {
                id: Number(item.id),
                title: item.title,
                city: item.city,
                date: item.date,
                time: item.time,
                note: typeof item.note === "string" ? item.note : "",
                visited: item.visited === true
            };

        });

    } catch (error) {

        console.error("Lỗi đọc LocalStorage:", error);

        itineraries = [];
    }
}


/* ==========================================
   6. ADD ITINERARY
========================================== */

// Thêm lịch trình
function addItinerary(title, city, date, time, note) {

    const newItem = {

        id: Date.now(),

        title: title,

        city: city,

        date: date,

        time: time,

        note: note,

        visited: false
    };

    itineraries.push(newItem);

    saveToLocalStorage();

    currentPage = 1;

    displayItineraries();
}


/* ==========================================
   7. EDIT ITINERARY
========================================== */

// Tìm lịch trình theo ID
function findItinerary(id) {

    return itineraries.find(function(item) {
        return item.id === id;
    });
}


// Mở form chỉnh sửa
function editItinerary(id) {

    const item = findItinerary(id);

    if (!item) return;

    editingId = id;

    document.getElementById("title").value = item.title;

    document.getElementById("city").value = item.city;

    document.getElementById("date").value = item.date;

    document.getElementById("time").value = item.time;

    document.getElementById("note").value = item.note;

    formTitle.textContent = "Chỉnh sửa lịch trình";

    submitButton.textContent = "Lưu thay đổi";

    cancelEditButton.classList.remove("hidden");

    showMessage(formMessage, "Bạn đang chỉnh sửa lịch trình.", "success");

    document.getElementById("itinerary").scrollIntoView({
        behavior: "smooth"
    });
}


// Cập nhật lịch trình
function updateItinerary(id, title, city, date, time, note) {

    const item = findItinerary(id);

    if (!item) return false;

    item.title = title;

    item.city = city;

    item.date = date;

    item.time = time;

    item.note = note;

    saveToLocalStorage();

    displayItineraries();

    return true;
}


// Đặt lại form
function resetEditForm() {

    editingId = null;

    itineraryForm.reset();

    formTitle.textContent = "Thêm địa điểm mới";

    submitButton.textContent = "Thêm lịch trình";

    cancelEditButton.classList.add("hidden");
}


// Hủy chỉnh sửa
cancelEditButton.addEventListener("click", function() {

    resetEditForm();

    showMessage(formMessage, "Đã hủy chỉnh sửa.", "success");
});


/* ==========================================
   8. DELETE ITINERARY
========================================== */

// Xóa lịch trình
function deleteItinerary(id) {

    const confirmed = confirm(
        "Bạn có chắc chắn muốn xóa lịch trình này?"
    );

    if (!confirmed) return;

    itineraries = itineraries.filter(function(item) {
        return item.id !== id;
    });

    if (editingId === id) {
        resetEditForm();
    }

    saveToLocalStorage();

    displayItineraries();

    showMessage(formMessage, "Đã xóa lịch trình.", "success");
}


/* ==========================================
   9. TOGGLE VISITED
========================================== */

// Thay đổi trạng thái tham quan
function toggleVisited(id) {

    const item = findItinerary(id);

    if (!item) return;

    item.visited = !item.visited;

    saveToLocalStorage();

    displayItineraries();
}


/* ==========================================
   10. SEARCH ITINERARY
========================================== */

// Tìm kiếm địa điểm
function searchItinerary(keyword) {

    const search = keyword.toLowerCase().trim();

    return itineraries.filter(function(item) {

        const title = item.title.toLowerCase();

        const city = item.city.toLowerCase();

        return (
            title.includes(search) ||
            city.includes(search)
        );

    });
}


/* ==========================================
   11. FILTER ITINERARY
========================================== */

// Lọc lịch trình
function filterItinerary(list, status) {

    if (status === "visited") {

        return list.filter(function(item) {
            return item.visited === true;
        });

    }

    if (status === "notVisited") {

        return list.filter(function(item) {
            return item.visited === false;
        });

    }

    return list;
}


/* ==========================================
   12. SORT ITINERARY
========================================== */

// Sắp xếp lịch trình
function sortItinerary(list, sortType) {

    const result = [...list];

    if (sortType === "newest") {

        result.sort(function(a, b) {

            return (
                a.date.localeCompare(b.date) ||
                a.time.localeCompare(b.time)
            );

        });

    } else if (sortType === "oldest") {

        result.sort(function(a, b) {

            return (
                b.date.localeCompare(a.date) ||
                b.time.localeCompare(a.time)
            );

        });

    } else if (sortType === "name") {

        result.sort(function(a, b) {

            return a.title.localeCompare(b.title, "vi");

        });

    }

    return result;
}


/* ==========================================
   13. CREATE ITINERARY CARD
========================================== */

// Tạo HTML cho từng lịch trình
function createItineraryCard(item) {

    const statusClass = item.visited ? "done" : "pending";

    const statusText = item.visited
        ? "Đã tham quan"
        : "Chưa tham quan";

    const toggleText = item.visited
        ? "Bỏ đánh dấu"
        : "Đã tham quan";

    return `

        <article class="card">

            <h3>${escapeHTML(item.title)}</h3>

            <p>📍 Thành phố: ${escapeHTML(item.city)}</p>

            <p>📅 Ngày: ${formatDate(item.date)}</p>

            <p>⏰ Thời gian: ${escapeHTML(item.time)}</p>

            <p>
                📝 Ghi chú:
                ${escapeHTML(item.note || "Không có ghi chú")}
            </p>

            <span class="status ${statusClass}">
                ${statusText}
            </span>

            <div class="card-actions">

                <button
                    type="button"
                    class="visited-button"
                    data-action="toggle"
                    data-id="${item.id}"
                >
                    ${toggleText}
                </button>

                <button
                    type="button"
                    class="edit-button"
                    data-action="edit"
                    data-id="${item.id}"
                >
                    Sửa
                </button>

                <button
                    type="button"
                    class="delete-button"
                    data-action="delete"
                    data-id="${item.id}"
                >
                    Xóa
                </button>

            </div>

        </article>

    `;
}


/* ==========================================
   14. DISPLAY ITINERARIES
========================================== */

// Hiển thị danh sách
function displayItineraries() {

    // Bước 1: Cập nhật thống kê
    updateStatistics();

    // Bước 2: Tìm kiếm
    let result = searchItinerary(searchInput.value);

    // Bước 3: Lọc
    result = filterItinerary(result, filterSelect.value);

    // Bước 4: Sắp xếp
    result = sortItinerary(result, sortSelect.value);

    // Bước 5: Tính toán phân trang
    const totalItems = result.length;

    const pageSize = Number(pageSizeSelect.value);

    const totalPages = pageSize === 0
        ? 1
        : Math.max(1, Math.ceil(totalItems / pageSize));

    // Giữ trang hiện tại trong giới hạn
    currentPage = Math.min(currentPage, totalPages);

    // Bước 6: Lấy dữ liệu của trang hiện tại
    let pageItems = result;

    if (pageSize !== 0) {

        const start = (currentPage - 1) * pageSize;

        const end = start + pageSize;

        pageItems = result.slice(start, end);

    }

    // Bước 7: Hiển thị HTML
    if (pageItems.length === 0) {

        itineraryList.innerHTML = `
            <div class="empty-state">
                Không tìm thấy lịch trình phù hợp.
            </div>
        `;

    } else {

        itineraryList.innerHTML = pageItems
            .map(createItineraryCard)
            .join("");

    }

    // Bước 8: Cập nhật nút phân trang
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;

    prevPageButton.disabled = currentPage <= 1;

    nextPageButton.disabled = currentPage >= totalPages;
}


/* ==========================================
   15. STATISTICS
========================================== */

// Cập nhật thống kê
function updateStatistics() {

    const total = itineraries.length;

    const visited = itineraries.filter(function(item) {

        return item.visited === true;

    }).length;

    const pending = total - visited;

    document.getElementById("totalCount").textContent = total;

    document.getElementById("visitedCount").textContent = visited;

    document.getElementById("pendingCount").textContent = pending;
}


/* ==========================================
   16. FORM SUBMIT
========================================== */

// Xử lý thêm và cập nhật lịch trình
itineraryForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Lấy dữ liệu từ Form
    const title = document.getElementById("title").value.trim();

    const city = document.getElementById("city").value.trim();

    const date = document.getElementById("date").value;

    const time = document.getElementById("time").value;

    const note = document.getElementById("note").value.trim();

    // Kiểm tra dữ liệu
    if (!title || !city || !date || !time) {

        showMessage(
            formMessage,
            "Vui lòng nhập đầy đủ thông tin bắt buộc.",
            "error"
        );

        return;
    }

    let successMessage = "";

    if (editingId !== null) {

        // Cập nhật dữ liệu cũ
        const success = updateItinerary(
            editingId,
            title,
            city,
            date,
            time,
            note
        );

        if (!success) {

            showMessage(
                formMessage,
                "Không tìm thấy lịch trình cần sửa.",
                "error"
            );

            return;
        }

        successMessage = "Cập nhật lịch trình thành công!";

    } else {

        // Thêm dữ liệu mới
        addItinerary(
            title,
            city,
            date,
            time,
            note
        );

        successMessage = "Thêm lịch trình thành công!";

    }

    // Đặt lại form nhưng giữ thông báo
    resetEditForm();

    showMessage(formMessage, successMessage, "success");

});


/* ==========================================
   17. SEARCH / FILTER / SORT EVENTS
========================================== */

// Khi tìm kiếm
searchInput.addEventListener("input", function() {

    currentPage = 1;

    displayItineraries();

});


// Khi lọc
filterSelect.addEventListener("change", function() {

    currentPage = 1;

    displayItineraries();

});


// Khi sắp xếp
sortSelect.addEventListener("change", function() {

    currentPage = 1;

    displayItineraries();

});


/* ==========================================
   18. PAGINATION EVENTS
========================================== */

// Khi thay đổi số phần tử mỗi trang
pageSizeSelect.addEventListener("change", function() {

    currentPage = 1;

    displayItineraries();

});


// Trang trước
prevPageButton.addEventListener("click", function() {

    if (currentPage > 1) {

        currentPage--;

        displayItineraries();

    }

});


// Trang tiếp theo
nextPageButton.addEventListener("click", function() {

    currentPage++;

    displayItineraries();

});


/* ==========================================
   19. EVENT DELEGATION
========================================== */

// Xử lý các nút Sửa, Xóa, Đã tham quan
itineraryList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button || !itineraryList.contains(button)) return;

    const id = Number(button.dataset.id);

    const action = button.dataset.action;

    if (action === "edit") {

        editItinerary(id);

    } else if (action === "delete") {

        deleteItinerary(id);

    } else if (action === "toggle") {

        toggleVisited(id);

    }

});


/* ==========================================
   20. EXPORT TXT
========================================== */

// Xuất lịch trình thành file TXT
function exportToTXT() {

    if (itineraries.length === 0) {

        alert("Chưa có lịch trình để xuất!");

        return;
    }

    const sortedItems = sortItinerary(itineraries, "newest");

    let content = "TRAVEL GLASS - LICH TRINH DU LICH\n";

    content += "====================================\n\n";

    sortedItems.forEach(function(item, index) {

        content += `${index + 1}. ${item.title}\n`;

        content += `Thanh pho: ${item.city}\n`;

        content += `Ngay: ${formatDate(item.date)}\n`;

        content += `Gio: ${item.time}\n`;

        content += `Ghi chu: ${item.note || "Khong co"}\n`;

        content += `Trang thai: ${
            item.visited ? "Da tham quan" : "Chua tham quan"
        }\n`;

        content += "------------------------------------\n";

    });

    const blob = new Blob(
        ["\uFEFF" + content],
        {
            type: "text/plain;charset=utf-8"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "TRAVEL-GLASS-Itinerary.txt";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


// Sự kiện xuất file
document.getElementById("exportButton").addEventListener(
    "click",
    exportToTXT
);


/* ==========================================
   21. INITIALIZE WEBSITE
========================================== */

// Khởi động website
function initWebsite() {

    console.log("TRAVEL GLASS JavaScript đã kết nối!");

    // Bước 1: Đọc dữ liệu LocalStorage
    loadFromLocalStorage();

    // Bước 2: Hiển thị danh sách
    displayItineraries();

    // Bước 3: Lấy thời tiết mặc định
    getWeather(cityInput.value.trim());

}


// Chạy website sau khi script được tải
initWebsite();
