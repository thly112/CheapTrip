import React, { useState } from "react";
import "../styles/Login.css";
import backgroundImage from "../assets/background.png";

// Định nghĩa kiểu cho đối tượng state
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");  // Kiểu email là string
  const [password, setPassword] = useState<string>("");  // Kiểu password là string

  // Định nghĩa kiểu cho event e trong handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={backgroundImage} alt="Travel" className="login-image" />
        <div className="quote">
          <h2>“CheapTrip – Gà mà biết đi chơi!”</h2>
        </div>
      </div>

      <div className="login-right">
        <h2 className="logo">Cheap Trip</h2>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-google"></i>
          <i className="fab fa-linkedin-in"></i>
        </div>
        <p>đăng nhập bằng email</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Tên đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fas fa-eye"></i>
          </div>

          <a href="#" className="forgot-password">Quên mật khẩu?</a>
          <button type="submit" className="login-btn">ĐĂNG NHẬP</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
