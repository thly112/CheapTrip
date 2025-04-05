import React, { FunctionComponent } from "react";
import "../styles/footer.css";
const Footer: FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Thông tin liên hệ */}
        <div className="footer-section">
          <h3>Thông tin liên hệ</h3>
          <p>📍 Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
          <p>📞 Điện thoại: 0123-456-789</p>
          <p>✉️ Email: contact@company.com</p>
        </div>

        {/* Cột 2: Chính sách */}
        <div className="footer-section">
          <h3>Chính sách</h3>
          <ul>
            <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
            <li><a href="/terms">Điều khoản sử dụng</a></li>
            <li><a href="/about-us">Giới thiệu về chúng tôi</a></li>
          </ul>
        </div>

        {/* Cột 3: Tải  */}
        <div className="footer-section">
          <h3>Tải Ứng Dụng</h3>
          <div className="download-links">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/200px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
            </a>
          </div>
        </div>

        {/* Cột 3: Google Map */}
        <div className="footer-section">
          <h3>Địa chỉ trên bản đồ</h3>
          <iframe
            title="Google Map"
            className="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6812477435785!2d106.68251147481894!3d10.759917889383316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fc7d7a59baf%3A0xe28b27c19e91a4f9!2zMTIzIMSQxrDhu51uZyBBQkMsIFF14bqjbmcgMSwgVGjhu4sgUGjDuiDEkGnhu4FuZywgSFRDQywgVmnhu4duIE5hbQ!5e0!3m2!1svi!2s!4v1712293827956!5m2!1svi!2s"
            width="100%"
            height="200"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>© 2025 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
