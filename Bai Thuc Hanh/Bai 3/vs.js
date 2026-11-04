/**
 * Nhận request POST từ Client và chèn dữ liệu vào Google Sheet
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Tránh xung đột khi nhiều người đăng ký cùng lúc

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Đọc dữ liệu JSON gửi lên từ client
    var data = JSON.parse(e.postData.contents);
    
    // Thêm hàng mới (Thêm Timestamp vào cột đầu tiên)
    sheet.appendRow([
      new Date(),
      data.Name,
      data.Email,
      data.Phone,
      data.TicketType
    ]);

    // Trả về JSON thành công kèm CORS Header
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'OK' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Trả về phản hồi lỗi nếu có sự cố
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}