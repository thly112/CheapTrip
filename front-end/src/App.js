import React from 'react';
import './App.css';
import Footer from "./components/footer.tsx";
import Header from "./components/header.tsx";
import Home from "./pages/Home.tsx";
function App() {

  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
