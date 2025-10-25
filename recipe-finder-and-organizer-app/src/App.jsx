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
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/Signup" element={ <Signup/>}/>
        <Route path="/login" element={ <Login/>} />
        <Route path="/profile" element={<Profile/>} />
       
      
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
