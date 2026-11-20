
const products = [
    { name: "Laptop Dell", price: 15000000, sale: true },
    { name: "Chuột Logitech", price: 500000, sale: false },
    { name: "Bàn phím cơ", price: 1200000, sale: true },
    { name: "Tai nghe Bluetooth", price: 900000, sale: false },
    { name: "Màn hình Samsung", price: 4500000, sale: true },
    { name: "USB 64GB", price: 250000, sale: false },
    { name: "iPad", price: 12000000, sale: true },
    { name: "Webcam", price: 1500000, sale: false },
    { name: "Ổ cứng SSD", price: 1800000, sale: true },
    { name: "Loa Bluetooth", price: 750000, sale: false }
];

// Hàm hiển thị danh sách sản phẩm
function displayProducts(list) {
    const result = document.getElementById("result");

    result.innerHTML = "";

    list.forEach(function(product) {
        result.innerHTML += `
            <div class="product">
                <h3>${product.name}</h3>
                <p>Giá: ${product.price.toLocaleString("vi-VN")} VNĐ</p>
                <p class="${product.sale ? "sale" : ""}">
                    ${product.sale ? "Đang giảm giá" : "Giá bình thường"}
                </p>
            </div>
        `;
    });

    if (list.length === 0) {
        result.textContent = "Không tìm thấy sản phẩm!";
    }
}

// Lọc sản phẩm đang giảm giá
function filterProducts() {
    const saleProducts = products.filter(function(product) {
        return product.sale === true;
    });

    console.log("Sản phẩm giảm giá:", saleProducts);

    displayProducts(saleProducts);
}

// Lọc sản phẩm trên 1 triệu và lấy tên
function filterExpensiveProducts() {
    const expensiveProducts = products.filter(function(product) {
        return product.price > 1000000;
    });

    const productNames = expensiveProducts.map(function(product) {
        return product.name;
    });

    console.log("Tên sản phẩm trên 1 triệu:", productNames);

    document.getElementById("result").innerHTML =
        "<h2>Sản phẩm trên 1 triệu đồng</h2>" +
        productNames.map(function(name) {
            return `<p>${name}</p>`;
        }).join("");
}

// Hiển thị toàn bộ sản phẩm ban đầu
displayProducts(products);
