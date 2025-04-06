// src/utils/formatText.js
export function formatItineraryText(text) {
    if (!text) return '';
  
    let formatted = text
      .replace(/^Tuyệt vời!/i, '🎉 **Tuyệt vời!**') // Tiêu đề cảm xúc
      .replace(/\*\*(Ngày \d+):\*\*/g, '### $1') // Nếu API đã bọc sẵn **
      .replace(/Ngày (\d+):/g, '### 🗓️ Ngày $1') // Bọc các ngày làm tiêu đề markdown
      .replace(/[*\-•] (.+)/g, '- $1') // Chuyển sang list markdown
      .replace(/lịch trình sơ bộ cho bạn như sau:/i, 'lịch trình sơ bộ cho bạn như sau:\n\n---') // thêm gạch ngang
      .replace(/(### .*?)\n/g, '\n$1\n') // xuống dòng sau mỗi ngày
      .replace(/Bạn thấy lịch trình này thế nào.*?$/i, '\n👉 **Bạn thấy lịch trình này thế nào ạ?** Có muốn Chipchip điều chỉnh gì không? 💖');
  
    return formatted;
  }
  