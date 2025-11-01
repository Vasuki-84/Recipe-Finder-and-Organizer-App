import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Favorites from "./Pages/Favorites";
import Collections from "./Pages/Collections";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
