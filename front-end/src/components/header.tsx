// import React from 'react';
// import "../styles/header.css";
// import logo from "../assets/logo.png"; // Đảm bảo đường dẫn chính xác tới logo
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleTripHistoryClick = () => {
//     navigate("/trip-history");
//   };
//   return (
//     <header className="header">
//       <div className="logo logo-header">
//         <img src={logo} alt="Logo" />
//       </div>

//       <div className="header-right">
//         <button className="api-button" onClick={handleTripHistoryClick}>Xem Lại Lịch Trình</button>

//         <nav className="auth-links">
//           <Link to="/register">Đăng ký</Link>
//           <Link to="/login">Đăng nhập</Link>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import "../styles/header.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom'; // ← import đầy đủ ở đây

const Header = () => {
  const navigate = useNavigate(); // ← hook điều hướng

  const handleTripHistoryClick = () => {
    navigate("/trip-history");
  };

  return (
    <header className="header">
      <div className="logo logo-header">
        <img src={logo} alt="Logo" />
      </div>

      <div className="header-right">
        <button className="api-button" onClick={handleTripHistoryClick}>
          Xem Lại Lịch Trình
        </button>

        <nav className="auth-links">
          <Link to="/register">Đăng ký</Link>
          <Link to="/login">Đăng nhập</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
