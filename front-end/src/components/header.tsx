import React, { useState, useEffect } from "react";
import "../styles/header.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import đầy đủ ở đây

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa (bằng cách kiểm tra token trong localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Nếu có token, người dùng đã đăng nhập
    }
  }, []);

  // Hàm xử lý sự kiện nhấn vào nút "Xem lại lịch trình"
  const handleTripHistoryClick = () => {
    navigate("/trip-history");
  };

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Nếu cần xóa thông tin người dùng
    setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập
    navigate("/"); // Chuyển hướng về trang chủ
  };

  return (
    <header className="header">
      <div className="logo logo-header">
        <img src={logo} alt="Logo" />
      </div>

      <div className="header-right">
        {/* Chỉ hiển thị nút "Xem lại lịch trình" khi người dùng đã đăng nhập */}
        {isLoggedIn && (
          <button className="api-button" onClick={handleTripHistoryClick}>
            Xem Lại Lịch Trình
          </button>
        )}

        <nav className="auth-links">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/register">Đăng ký</Link>
              <Link to="/login">Đăng nhập</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
