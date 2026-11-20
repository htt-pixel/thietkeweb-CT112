
const products = [
    {
        id: 1,
        name: "Laptop Dell",
        price: 15000000,
        category: "Laptop"
    },
    {
        id: 2,
        name: "Chuột Logitech",
        price: 500000,
        category: "Phụ kiện"
    },
    {
        id: 3,
        name: "Bàn phím cơ",
        price: 1200000,
        category: "Phụ kiện"
    },
    {
        id: 4,
        name: "Màn hình Samsung",
        price: 4500000,
        category: "Màn hình"
    },
    {
        id: 5,
        name: "Tai nghe Bluetooth",
        price: 900000,
        category: "Phụ kiện"
    }
];

// Lấy khu vực hiển thị sản phẩm
const productList = document.getElementById("productList");

// Duyệt qua từng sản phẩm
products.forEach(function(product) {

    // Tạo một thẻ div
    const card = document.createElement("div");

    // Thêm class card
    card.classList.add("card");

    // Đổ nội dung vào thẻ div
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>Mã sản phẩm: ${product.id}</p>
        <p>Danh mục: ${product.category}</p>
        <p class="price">
            ${product.price.toLocaleString("vi-VN")} VNĐ
        </p>
    `;

    // Đưa thẻ card vào trang web
    productList.appendChild(card);
});
