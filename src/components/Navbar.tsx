"use client";
import { useState } from "react";
import { useAuth } from "../context/authContext.tsx";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { removeToken } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const toggleProfile = () => {
    if (token) {
      setIsProfileOpen((prev) => !prev);
    } else {
      setIsProfileOpen(false);
      navigate("/auth");
    }
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("Token"); // Ensure token is removed
    navigate("/auth"); // Redirect after logout
    setIsProfileOpen(false);
  };

  return (
    <nav className={`w-full shadow-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <i className="fas fa-tasks text-2xl"></i>
            <span className="ml-2 text-xl font-poppins font-semibold">
              TaskManager
            </span>
          </div>

          {/* Right Side (Buttons & Profile) */}
          {token && (
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDark ? (
                  <i className="fas fa-sun text-yellow-400"></i>
                ) : (
                  <i className="fas fa-moon text-gray-600"></i>
                )}
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400"
                >
                  <i className="fas fa-user"></i>
                </button>

                {isProfileOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${isDark ? "bg-gray-700" : "bg-white"} ring-1 ring-black ring-opacity-5`}>
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                    >
                      <i className="fas fa-user-circle mr-2"></i>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`block w-full text-left px-4 py-2 text-sm ${isDark ? "hover:bg-gray-600" : "hover:bg-gray-100"}`}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
