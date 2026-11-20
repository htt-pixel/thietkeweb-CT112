// BƯỚC 1: Thay URL bên dưới bằng URL CSV đã xuất bản từ Google Sheets.
const SHEET_CSV_URL = "PASTE_YOUR_GOOGLE_SHEETS_CSV_URL_HERE";

const projectList = document.querySelector("#projectList");
const statusText = document.querySelector("#status");
document.querySelector("#reloadBtn").addEventListener("click", loadProjects);

async function loadProjects() {
  if (SHEET_CSV_URL.startsWith("PASTE_")) {
    statusText.textContent = "Bạn cần dán URL CSV của Google Sheets vào biến SHEET_CSV_URL trong script.js.";
    renderProjects(sampleProjects);
    return;
  }

  statusText.textContent = "Đang tải dữ liệu...";
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error("Không thể tải Google Sheets.");
    const csvText = await response.text();
    const projects = parseCSV(csvText);
    renderProjects(projects);
    statusText.textContent = `Đã tải ${projects.length} dự án từ Google Sheets.`;
  } catch (error) {
    statusText.textContent = "Tải dữ liệu thất bại. Kiểm tra quyền chia sẻ và URL CSV.";
    console.error(error);
  }
}

// CSV đơn giản: các cột cần có là name, description, image, category, link.
function parseCSV(text) {
  const rows = text.trim().split(/\r?\n/).map(line => line.split(",").map(cell => cell.trim()));
  const headers = rows.shift().map(h => h.toLowerCase());
  return rows.filter(row => row.length >= headers.length).map(row => {
    const item = {};
    headers.forEach((header, index) => item[header] = row[index] || "");
    return item;
  });
}

function renderProjects(projects) {
  projectList.replaceChildren();
  projects.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    const image = document.createElement("img");
    image.src = project.image || "https://placehold.co/600x350?text=Project";
    image.alt = `Ảnh dự án ${project.name || ""}`;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "project-content";
    const title = document.createElement("h3");
    title.textContent = project.name || "Dự án chưa đặt tên";
    const description = document.createElement("p");
    description.textContent = project.description || "";
    const category = document.createElement("small");
    category.textContent = project.category || "Chưa phân loại";
    content.append(title, description, category);

    if (project.link) {
      const link = document.createElement("a");
      link.href = project.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Xem dự án ↗";
      content.append(link);
    }
    card.append(image, content);
    projectList.append(card);
  });
}

const sampleProjects = [
  { name: "BUSROUTE", description: "Mô phỏng tìm đường xe buýt với BFS và Dijkstra.", image: "https://placehold.co/600x350/edf1ff/526dff?text=BUSROUTE", category: "Web", link: "#" },
  { name: "Portfolio cá nhân", description: "Website giới thiệu bản thân và kỹ năng.", image: "https://placehold.co/600x350/e8f6f1/258c70?text=Portfolio", category: "Web", link: "#" },
  { name: "Database xe buýt", description: "Thiết kế dữ liệu quản lý lịch trình xe buýt.", image: "https://placehold.co/600x350/fff0e3/c87935?text=Database", category: "Database", link: "#" }
];

loadProjects();
