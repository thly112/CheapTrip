// // src/App.js
// import React from 'react';
// import './App.css';
// import { Routes, Route, useLocation } from 'react-router-dom';

// import Header from "./components/header.tsx";
// import Footer from "./components/footer.tsx";
// import Home from "./pages/Home.tsx";
// import Login from "./pages/Login.js";

// function App() {
//   const location = useLocation();
//   const hideHeaderFooter = location.pathname === "/login";

//   return (
//     <div className="App">
//       {!hideHeaderFooter && <Header />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         {/* Add other routes here */}
//       </Routes>

//       {!hideHeaderFooter && <Footer />}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.js";
// import Register from './pages/Register';

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login';

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}