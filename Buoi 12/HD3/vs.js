const productListEl = document.querySelector("#product-list");

function formatCurrencyVND(amount) {
  return `${amount.toLocaleString("vi-VN")}đ`;
}

function renderCards(items) {
  if (!Array.isArray(items) || items.length === 0) {
    productListEl.innerHTML = "<p>Không có sản phẩm nào phù hợp.</p>";
    return;
  }

  const cardsHtml = items
    .map((product) => {
      const saleBadge = product.onSale
        ? `<span class="card__badge">Đang giảm giá</span>`
        : "";

      return `
        <div class="card">
          ${saleBadge}
          <h2 class="card__title">${product.name}</h2>
          <p class="card__price">${formatCurrencyVND(product.price)}</p>
        </div>
      `;
    })
    .join("");

  productListEl.innerHTML = cardsHtml;
}

// Hiển thị toàn bộ danh sách lúc ban đầu
renderCards(products);

// Gắn sự kiện cho các nút lọc
document.querySelector("#btn-all").addEventListener("click", () => {
  renderCards(products);
});

document.querySelector("#btn-sale").addEventListener("click", () => {
  const onlySale = products.filter((p) => p.onSale);
  renderCards(onlySale);
});

document.querySelector("#btn-over-1m").addEventListener("click", () => {
  const overOneMillion = products.filter((p) => p.price > 1000000);
  renderCards(overOneMillion);
});