// Import các thư viện
const mysql = require('mysql2');
require('dotenv').config();

// Tạo kết nối đến MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

// Kiểm tra kết nối MySQL
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Export kết nối nếu bạn muốn dùng kết nối ở các module khác
module.exports = connection;
