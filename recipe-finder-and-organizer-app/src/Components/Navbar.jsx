import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CookingPot, Menu, X, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, loadUser } from "../redux/userSlice";
import { navbarLinks } from "../data"; 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    dispatch(loadUser());
    const storedUser = localStorage.getItem("signedUpUser");
    setSignedUp(!!storedUser);

    //  Custom events for cross-component updates
    const handleUserSignup = () => {
      const updatedUser = localStorage.getItem("signedUpUser");
      setSignedUp(!!updatedUser);
    };

    const handleUserLogin = () => {
      const loggedUser = localStorage.getItem("loggedInUser");
      if (loggedUser) setSignedUp(true);
    };

    const handleUserLogout = () => {
      setSignedUp(false);
    };

    window.addEventListener("userSignedUp", handleUserSignup);
    window.addEventListener("userLoggedIn", handleUserLogin);
    window.addEventListener("userLoggedOut", handleUserLogout);

    return () => {
      window.removeEventListener("userSignedUp", handleUserSignup);
      window.removeEventListener("userLoggedIn", handleUserLogin);
      window.removeEventListener("userLoggedOut", handleUserLogout);
    };
  }, [dispatch, location]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("signedUpUser");
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
          <CookingPot size={26} />
          <span>SmartChef</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-medium">
          {navbarLinks
            .filter((data) => {
              //  Filter signup/login depending on state
              if (user) return data.title !== "SignUp" && data.title !== "Login";
              if (signedUp) return data.title !== "SignUp";
              return true;
            })
            .map((data) => (
              <Link
                key={data.id}
                to={data.link}
                className={`flex items-center gap-1 hover:text-orange-300 transition ${
                  location.pathname === data.link ? "text-orange-300" : ""
                }`}
              >
                {data.icon}
                {data.title}
              </Link>
            ))}

          {/* If logged in → show Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-700 flex flex-col items-center py-3 space-y-3 font-medium">
          {navbarLinks
            .filter((data) => {
              if (user) return data.title !== "SignUp" && data.title !== "Login";
              if (signedUp) return data.title !== "SignUp";
              return true;
            })
            .map((data) => (
              <Link
                key={data.id}
                to={data.link}
                onClick={toggleMenu}
                className="flex items-center gap-1 hover:text-orange-300 transition"
              >
                {data.icon}
                {data.title}
              </Link>
            ))}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
