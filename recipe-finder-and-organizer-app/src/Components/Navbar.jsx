import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CookingPot, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed w-full z-20 top-0 left-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-serif text-gray-800 flex items-center gap-2">
          SmartChef    <div className="text-green-600 mb-2 "><CookingPot size={24} /></div>
            </h1>
        
      

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/Favorites">Favorites</Link>
          <Link to="/Collections">Collections</Link>
          <Link to="/CustomCreations">Custom Creations</Link>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg py-4 px-6 space-y-3 animate-slide-down">
          <Link onClick={toggleMenu} className="block font-semibold" to="/">
            Home
          </Link>
          <Link onClick={toggleMenu} className="block font-semibold" to="/discover">
            Discover
          </Link>
          <Link onClick={toggleMenu} className="block font-semibold" to="/Favorites">
            Favorites
          </Link>
          <Link onClick={toggleMenu} className="block font-semibold" to="/Collections">
            Collections
          </Link>
          <Link onClick={toggleMenu} className="block font-semibold" to="/CustomCreations">
            Custom Creations
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
