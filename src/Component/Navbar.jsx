// Component/Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import { Home, MapPin, Plus, User, Star, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme persistence and initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      toast.success("You've been logged out. See you soon!");
      setIsUserDropdownOpen(false);
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  const navLinkClass = "block px-4 py-2 text-white hover:text-yellow-400 font-medium transition";

  if (loading) return <div className="h-16 bg-gray-900"></div>;

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">HomeNest</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClass} end>
              <span className="flex items-center gap-1"><Home size={16} /> Home</span>
            </NavLink>
            <NavLink to="/properties" className={navLinkClass}>
              <span className="flex items-center gap-1"><MapPin size={16} /> All Properties</span>
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-property" className={navLinkClass}>
                  <span className="flex items-center gap-1"><Plus size={16} /> Add Property</span>
                </NavLink>
                <NavLink to="/my-properties" className={navLinkClass}>
                  <span className="flex items-center gap-1"><User size={16} /> My Properties</span>
                </NavLink>
                <NavLink to="/my-ratings" className={navLinkClass}>
                  <span className="flex items-center gap-1"><Star size={16} /> My Ratings</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Auth / User */}
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-yellow-500 cursor-pointer hover:scale-105 transition"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                />
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-20 border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <p className="font-semibold truncate">{user.displayName || user.email}</p>
                      <p className="text-sm text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-white hover:bg-gray-700 transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-gray-900 transition">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 mt-2 rounded-lg overflow-hidden">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)} end>
              <span className="flex items-center gap-2"><Home size={16} /> Home</span>
            </NavLink>
            <NavLink to="/properties" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              <span className="flex items-center gap-2"><MapPin size={16} /> All Properties</span>
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-property" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-2"><Plus size={16} /> Add Property</span>
                </NavLink>
                <NavLink to="/my-properties" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-2"><User size={16} /> My Properties</span>
                </NavLink>
                <NavLink to="/my-ratings" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                  <span className="flex items-center gap-2"><Star size={16} /> My Ratings</span>
                </NavLink>
              </>
            )}

            <div className="px-4 py-3 border-t border-gray-700">
              {/* Theme Toggle - Mobile */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-white">Theme</span>
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="p-2 rounded text-white bg-gray-700"
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
              </div>

              {/* Auth - Mobile */}
              {user ? (
                <div>
                  <div className="p-2 bg-gray-700 rounded mb-2">
                    <p className="text-white truncate">{user.displayName || user.email}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignout();
                    }}
                    className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    <LogOut size={16} className="inline mr-1" /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-center py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-gray-900 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;