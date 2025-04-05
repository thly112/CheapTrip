// src/pages/TripHistory.tsx
import React from 'react';
import '../styles/TripHistory.css'; // Create this CSS file for styling

const TripHistory: React.FC = () => {
  return (
    <div className="trip-history-page">
      <h1>Lịch Sử Chuyến Đi</h1>
      <p>Đây là danh sách các lịch trình chuyến đi bạn đã tạo với CheapTrip.</p>
      {/* Placeholder for trip history list */}
      <div className="trip-list">
        <div className="trip-item">
          <h3>Chuyến đi đến Đà Lạt</h3>
          <p>Ngày: 01/05/2025 - 05/05/2025</p>
          <p>Điểm đến: Đà Lạt, Lâm Đồng</p>
        </div>
        <div className="trip-item">
          <h3>Chuyến đi đến Phú Quốc</h3>
          <p>Ngày: 15/06/2025 - 20/06/2025</p>
          <p>Điểm đến: Phú Quốc, Kiên Giang</p>
        </div>
      </div>
      <a href="/">Quay lại trang chủ</a>
    </div>
  );
};

export default TripHistory;