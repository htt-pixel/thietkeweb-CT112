
// 1. Tạo dữ liệu sản phẩm bằng Object và Array
const products = [
    {
        id: 1,
        name: "Nike Air Force 1",
        price: 2500000,
        brand: "Nike"
    },
    {
        id: 2,
        name: "Adidas Superstar",
        price: 1800000,
        brand: "Adidas"
    },
    {
        id: 3,
        name: "Puma Suede",
        price: 900000,
        brand: "Puma"
    },
    {
        id: 4,
        name: "Nike Air Max",
        price: 3200000,
        brand: "Nike"
    },
    {
        id: 5,
        name: "Converse Chuck Taylor",
        price: 750000,
        brand: "Converse"
    },
    {
        id: 6,
        name: "Adidas Ultraboost",
        price: 2800000,
        brand: "Adidas"
    },
    {
        id: 7,
        name: "Puma RS-X",
        price: 1500000,
        brand: "Puma"
    },
    {
        id: 8,
        name: "Nike Dunk Low",
        price: 2100000,
        brand: "Nike"
    },
    {
        id: 9,
        name: "Vans Old Skool",
        price: 850000,
        brand: "Vans"
    },
    {
        id: 10,
        name: "Adidas Gazelle",
        price: 1700000,
        brand: "Adidas"
    }
];

// Lấy các phần tử HTML
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const filterButton = document.getElementById("filterButton");
const showAllButton = document.getElementById("showAllButton");

// 2. Hiển thị sản phẩm
function displayProducts(data) {
    productList.innerHTML = "";

    if (data.length === 0) {
        productList.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
        return;
    }

    data.forEach(function(product) {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Thương hiệu: ${product.brand}</p>
            <p class="price">
                ${product.price.toLocaleString("vi-VN")} VNĐ
            </p>
            <button onclick="addToCart(${product.id})">
                Thêm vào giỏ
            </button>
        `;

        productList.appendChild(card);
    });
}

// 3. Tìm kiếm sản phẩm
searchInput.addEventListener("input", function() {
    const keyword = searchInput.value.toLowerCase();

    const result = products.filter(function(product) {
        return product.name.toLowerCase().includes(keyword);
    });

    displayProducts(result);
});

// 4. Lọc sản phẩm trên 1 triệu
filterButton.addEventListener("click", function() {
    const result = products.filter(function(product) {
        return product.price > 1000000;
    });

    displayProducts(result);
});

// 5. Hiển thị tất cả sản phẩm
showAllButton.addEventListener("click", function() {
    searchInput.value = "";
    displayProducts(products);
});

// 6. Thêm sản phẩm vào giỏ hàng
function addToCart(id) {
    const product = products.find(function(item) {
        return item.id === id;
    });

    alert("Bạn đã chọn: " + product.name);
}

// 7. Kiểm tra Form Validation
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    if (name === "") {
        message.style.color = "red";
        message.textContent = "Vui lòng nhập họ tên!";
        return;
    }

    if (!email.includes("@")) {
        message.style.color = "red";
        message.textContent = "Email không hợp lệ!";
        return;
    }

    message.style.color = "green";
    message.textContent = "Đăng ký thành công!";

    registerForm.reset();
});

// 8. Hiển thị sản phẩm khi mở website
displayProducts(products);

console.log("Website đã kết nối JavaScript thành công!");
