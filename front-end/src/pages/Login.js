import React, { useState } from "react";
import "../styles/Login.css";
import backgroundImage from "../assets/background.png"; // Thay ảnh phù hợp
import { useNavigate } from "react-router-dom"; // Thêm hook useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state để lưu lỗi

  const navigate = useNavigate(); // Khởi tạo useNavigate để chuyển hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu email và mật khẩu không trống
    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      // Gửi yêu cầu POST tới API
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Kiểm tra mã phản hồi
      if (response.ok) {
        const data = await response.json();
        console.log("Đăng nhập thành công", data);

        // Lưu token vào localStorage
        localStorage.setItem("token", data.token);

        // Lưu thông tin người dùng nếu cần thiết
        localStorage.setItem("user", JSON.stringify(data.user));

        // Chuyển hướng người dùng về trang chủ sau khi đăng nhập thành công
        navigate("/"); // Chuyển hướng về trang chủ
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      setError("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Phần bên trái chứa hình ảnh và câu quote */}
        <div className="login-left">
          <img src={backgroundImage} alt="Travel" className="login-image" />
          <div className="quote">
            <h2>“CheapTrip – Gà mà biết đi chơi!”</h2>
          </div>
        </div>

        {/* Phần bên phải chứa form login */}
        <div className="login-right">
          <h2 className="logo">Cheap Trip</h2>

          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
          <p>đăng nhập bằng email</p>

          {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}

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
    </div>
  );
};

export default Login;
