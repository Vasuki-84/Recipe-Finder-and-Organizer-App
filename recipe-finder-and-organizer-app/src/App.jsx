import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Discover from "./Pages/Discover";
import Favorites from "./Pages/Favorites";
import Collections from "./Pages/Collections";
import Signup from "./Pages/Signup";
import CustomCreations from "./Pages/CustomCreations";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/customCreations" element={<CustomCreations />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
