// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/home.css';
import logo from '../assets/logo.png'; // Adjust the path to your logo image

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Background CheapTrip logo (replaced with image) */}
      <img src={logo} alt="CheapTrip Background Logo" className="background-logo" />

      {/* Main content */}
      <div className="content">
        {/* Search/Input bar */}
        <div className="search-bar">
          <input type="text" placeholder="Hỏi CheapTrip về chuyến đi tiếp theo của bạn..." />
          <button className="search-button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 12L12 20L10.5 18.5L16 13H4V11H16L10.5 5.5L12 4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Home;