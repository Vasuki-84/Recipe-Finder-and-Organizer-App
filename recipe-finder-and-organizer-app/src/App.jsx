import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Discover from "./Pages/Discover";

function App() {
  return (
    <div>
      <Navbar />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
         <Footer />
    </div>
  );
}

export default App;
