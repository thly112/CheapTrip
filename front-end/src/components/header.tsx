import React from 'react';
import "../styles/header.css";
import logo from '../assets/logo.png'; // Đảm bảo đường dẫn chính xác tới logo


const Header: React.FC<HeaderProps> = () => {
  

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt={"Logo"} />
      </div>
      
      <nav className="auth-links">
        <a href="/register">Đăng ký</a>
        <a href="/login">Đăng nhập</a>
      </nav>
    </header>
  );
};

export default Header;
