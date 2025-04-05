import React from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png"; // Đảm bảo đường dẫn chính xác tới logo
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo logo-header">
        <img src={logo} alt="Logo" />
      </div>

      <div className="header-right">
        <button className="api-button">Xem Lại Lịch Trình</button>

        <nav className="auth-links">
          <Link to="/register">Đăng ký</Link>
          <Link to="/login">Đăng nhập</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
