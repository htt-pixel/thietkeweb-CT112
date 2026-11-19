const products = [
  { id: 1, name: "Chuột gaming không dây", price: 650000, onSale: true },
  { id: 2, name: "Bàn phím cơ TKL", price: 1250000, onSale: false },
  { id: 3, name: "Tai nghe chống ồn", price: 1890000, onSale: true },
  { id: 4, name: "Lót chuột cỡ lớn", price: 180000, onSale: true },
  { id: 5, name: "Màn hình 24 inch FHD", price: 2950000, onSale: false },
  { id: 6, name: "Webcam Full HD", price: 780000, onSale: false },
  { id: 7, name: "Giá đỡ màn hình đôi", price: 1120000, onSale: true },
  { id: 8, name: "Hub chuyển đổi USB-C", price: 540000, onSale: false },
  { id: 9, name: "Microphone thu âm USB", price: 1450000, onSale: true },
  { id: 10, name: "Đèn kẹp màn hình", price: 420000, onSale: true }
];

// 1. Lọc các sản phẩm "Đang giảm giá"
const saleProducts = products.filter((product) => product.onSale === true);
console.log("Sản phẩm đang giảm giá:", saleProducts);

// 2. Lọc sản phẩm giá > 1.000.000đ và dùng map() lấy danh sách tên
const expensiveProductNames = products
  .filter((product) => product.price > 1000000)
  .map((product) => product.name);

console.log("Tên sản phẩm trên 1 triệu:", expensiveProductNames);