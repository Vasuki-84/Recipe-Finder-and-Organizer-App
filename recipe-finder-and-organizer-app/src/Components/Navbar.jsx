import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CookingPot, Menu, X ,LogOut } from "lucide-react";
import { navbarLinks } from "../data";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    navigate("/")
  };


  return (
    <nav className="bg-gray-100 shadow-md px-6 py-4 fixed w-full z-20 top-0 left-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-serif text-gray-800 flex items-center gap-2">
          SmartChef
          <div className="text-green-600 mb-2">
            <CookingPot size={24} />
          </div>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-semibold">
          <ul className="flex space-x-6">
            {navbarLinks
              //  Hide Signup & Login if user is logged in, hide Profile if not logged in
              .filter((data) =>
                user
                  ? data.title !== "Signup" && data.title !== "Login"
                  : data.title !== "Profile"
              )
              .map((data) => (
                <li
                  key={data.id}
                  className="flex gap-1 hover:text-green-400 motion-safe:transition motion-safe:hover:-translate-y-0.5"
                >
                  <p className="mt-1">{data.icon}</p>
                  <Link to={data.link}>{data.title}</Link>
                </li>
              ))}

            {/*  Logout Button (Visible only if logged in) */}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
              >
                Logout
                
              </button>
            )}
          </ul>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white shadow-lg rounded-lg py-4 px-6 space-y-3 animate-slide-down">
          {navbarLinks
            .filter((data) =>
              user
                ? data.title !== "Signup" && data.title !== "Login"
                : data.title !== "Profile"
            )
            .map((data) => (
              <Link
                key={data.id}
                to={data.link}
                onClick={() => setIsOpen(false)}
                className="flex gap-1 font-semibold hover:text-green-400 motion-safe:transition motion-safe:hover:-translate-y-0.5"
              >
                <p className="mt-1">{data.icon}</p>
                {data.title}
              </Link>
            ))}

          {/* Logout for Mobile */}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className=" flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
            >  <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
