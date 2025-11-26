import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import { 
  Home, 
  MapPin, 
  Plus, 
  User, 
  Star, 
  LogOut, 
  Menu, 
  X,
  Sun,
  Moon,
  ChevronDown,
  Building
} from "lucide-react";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const browserPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && browserPrefersDark)) {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const switchTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
      setUserDropdownOpen(false);
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive 
        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  if (loading) {
    return (
      <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-pulse"></div>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl">
              <Building className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-teal-600 transition-all">
              HomeNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkStyle} end>
              <Home size={18} />
              Home
            </NavLink>
            
            <NavLink to="/properties" className={navLinkStyle}>
              <MapPin size={18} />
              All Properties
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-property" className={navLinkStyle}>
                  <Plus size={18} />
                  Add Property
                </NavLink>

                <NavLink to="/my-properties" className={navLinkStyle}>
                  <User size={18} />
                  My Properties
                </NavLink>

                <NavLink to="/my-ratings" className={navLinkStyle}>
                  <Star size={18} />
                  My Ratings
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={switchTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Profile or Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <img
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm"
                  />
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-teal-600 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 mt-2 mb-4 overflow-hidden">
            <div className="p-4 space-y-2">
              <NavLink
                to="/"
                className={navLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
                end
              >
                <Home size={18} />
                Home
              </NavLink>

              <NavLink
                to="/properties"
                className={navLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin size={18} />
                All Properties
              </NavLink>

              {user && (
                <>
                  <NavLink
                    to="/add-property"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus size={18} />
                    Add Property
                  </NavLink>

                  <NavLink
                    to="/my-properties"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    My Properties
                  </NavLink>

                  <NavLink
                    to="/my-ratings"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Star size={18} />
                    My Ratings
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Bottom Section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              {/* Theme Toggle */}
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
                <button
                  onClick={switchTheme}
                  className="p-2 rounded-lg bg-white dark:bg-gray-600 shadow-sm hover:shadow-md transition-all"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* User Section */}
              {user ? (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-semibold truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Login
                  </Link>
                  
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-teal-600 transition-all"
                  >
                    Get Started
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