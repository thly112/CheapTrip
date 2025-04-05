import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer.tsx'; // Adjust the path if needed
import Header from './components/header.tsx'; // Adjust the path if needed
import Home from './pages/Home.tsx';
import TripHistory from './pages/TripHistory'; // From previous responses

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Header will be present on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trip-history" element={<TripHistory />} />
        </Routes>
        <Footer /> {/* Footer will be present on all pages */}
      </div>
    </Router>
  );
}

export default App;
