// src/Component/Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import { 
  Home, MapPin, Plus, User, Star, LogOut, Menu, X, Sun, Moon, ChevronDown, Building 
} from "lucide-react";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setDarkMode(saved === "dark");
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const switchTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
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
        ? "bg-primary text-primary-content" 
        : "text-base-content hover:bg-base-200 hover:text-primary"
    }`;

  if (loading) {
    return <div className="h-16 bg-base-100 border-b border-base-200 animate-pulse"></div>;
  }

  return (
    <nav className="bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Building className="text-primary-content" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary group-hover:opacity-80 transition-opacity">
              HomeNest
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkStyle} end>
              <Home size={18} /> Home
            </NavLink>
            <NavLink to="/properties" className={navLinkStyle}>
              <MapPin size={18} /> All Properties
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-property" className={navLinkStyle}>
                  <Plus size={18} /> Add Property
                </NavLink>
                <NavLink to="/my-properties" className={navLinkStyle}>
                  <User size={18} /> My Properties
                </NavLink>
                <NavLink to="/my-ratings" className={navLinkStyle}>
                  <Star size={18} /> My Ratings
                </NavLink>
              </>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={switchTheme}
              className="p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User/Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200"
                >
                  <img
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                  <ChevronDown size={16} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-2xl border border-base-200 z-20">
                    <div className="p-4 border-b border-base-200">
                      <p className="font-semibold text-base-content truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-base-content/70 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-error hover:bg-error/10"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="px-6 py-2 text-primary font-medium hover:opacity-80">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-primary text-primary-content rounded-lg font-medium hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-base-100 rounded-2xl shadow-2xl border border-base-200 mt-2 mb-4">
            <div className="p-4 space-y-2">
              <NavLink to="/" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)} end>
                <Home size={18} /> Home
              </NavLink>
              <NavLink to="/properties" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                <MapPin size={18} /> All Properties
              </NavLink>
              {user && (
                <>
                  <NavLink to="/add-property" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <Plus size={18} /> Add Property
                  </NavLink>
                  <NavLink to="/my-properties" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <User size={18} /> My Properties
                  </NavLink>
                  <NavLink to="/my-ratings" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>
                    <Star size={18} /> My Ratings
                  </NavLink>
                </>
              )}
            </div>

            <div className="p-4 border-t border-base-200 space-y-4">
              <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                <span className="font-medium">Theme</span>
                <button onClick={switchTheme} className="p-2 rounded-lg bg-base-100">
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {user ? (
                <div className="space-y-3">
                  <div className="p-3 bg-base-200 rounded-lg">
                    <p className="font-semibold text-base-content truncate">{user.displayName || user.email}</p>
                    <p className="text-sm text-base-content/70 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-error text-error-content rounded-lg font-medium hover:opacity-90"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 text-primary font-medium">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-3 bg-primary text-primary-content rounded-lg font-medium">
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