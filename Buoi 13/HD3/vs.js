const initialIssues = [
  { id: 1, title: "Khởi tạo cấu trúc thư mục và file tách biệt", layer: "HTML" },
  { id: 2, title: "Thiết kế lưới dịch vụ và form đặt lịch responsive", layer: "CSS" },
  { id: 3, title: "Viết hàm chọn dịch vụ, tính tổng tiền và validate form", layer: "JavaScript" }
];

function renderIssues() {
  const listEl = document.getElementById("gh-issue-list");
  listEl.innerHTML = initialIssues
    .map(
      (issue) => `
      <li class="gh-item">
        <span><strong>#${issue.id}</strong> - ${issue.title}</span>
        <span class="gh-badge">${issue.layer}</span>
      </li>
    `
    )
    .join("");
}

document.getElementById("gh-issue-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("gh-issue-title");
  const layerSelect = document.getElementById("gh-issue-layer");
  const title = titleInput.value.trim();

  if (!title) return;

  initialIssues.push({
    id: initialIssues.length + 1,
    title: title,
    layer: layerSelect.value
  });

  renderIssues();
  titleInput.value = "";
});

renderIssues();