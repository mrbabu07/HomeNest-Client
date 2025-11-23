// Component/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext"; // আপনার কনটেক্সট পাথ ম্যাচ করুন
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config"; // আপনার ফায়ারবেস কনফিগ পাথ ম্যাচ করুন
import { toast } from "react-toastify"; // ধরে নিচ্ছি আপনি react-toastify ব্যবহার করছেন
import { Home, MapPin, Plus, User, Star, LogOut, Menu, X } from "lucide-react"; // আইকন যোগ করুন

const Navbar = () => {
  const { user, loading } = useContext(AuthContext); // AuthContext থেকে ইউজার স্টেট নিন
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // মোবাইলে ইউজার ড্রপডাউন টগলের জন্য

  const handleSignout = async () => {
    try {
      await signOut(auth);
      toast.success("You've been logged out. See you soon!");
      setIsUserDropdownOpen(false); // লগআউট করলে ড্রপডাউন বন্ধ করে দিন
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  const navLinkClass = "block px-4 py-2 text-white hover:text-yellow-400 font-medium transition";

  if (loading) return <div className="h-16 bg-gray-900"></div>; // লোডিং স্টেট রাখুন

  return (
    <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* আপনি চাইলে একটা হাউস আইকন ব্যবহার করতে পারেন, বা শুধু টেক্সট */}
            {/* <House className="w-6 h-6 text-yellow-400" /> */}
            <span className="text-xl font-bold text-white">HomeNest</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={navLinkClass} end> {/* end দিলে এক্টিভ হবে শুধুমাত্র / এ */}
              <span className="flex items-center gap-1"><Home size={16} /> Home</span>
            </NavLink>
            <NavLink to="/properties" className={navLinkClass}>
              <span className="flex items-center gap-1"><MapPin size={16} /> All Properties</span>
            </NavLink>
            {user && ( // শুধুমাত্র লগইন করা ইউজারের জন্য
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
                <NavLink to="/update-property" className={navLinkClass}>
                  <span className="flex items-center gap-1"><Star size={16} /> Update Property</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} // ডিফল্ট ছবি
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-yellow-500 cursor-pointer hover:scale-105 transition"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} // ক্লিকে ড্রপডাউন টগল
                  />
                  {isUserDropdownOpen && ( // ড্রপডাউন কন্টেন্ট
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded-lg shadow-lg z-20 border border-gray-700">
                      <div className="p-4 border-b border-gray-700">
                        <p className="font-semibold truncate">{user.displayName || user.email}</p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleSignout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-white hover:bg-gray-700 transition"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
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

        {/* Mobile Dropdown */}
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

            {/* Auth Buttons Mobile */}
            <div className="px-4 py-3 border-t border-gray-700">
              {user ? (
                <>
                  {/* Mobile User Dropdown Trigger */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between p-2 bg-gray-700 rounded cursor-pointer" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                      <div className="flex items-center space-x-2">
                        <img
                          src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full border border-yellow-500"
                        />
                        <span className="truncate">{user.displayName || user.email}</span>
                      </div>
                      <span>{isUserDropdownOpen ? '▲' : '▼'}</span>
                    </div>
                    {/* Mobile User Dropdown Content */}
                    {isUserDropdownOpen && (
                      <div className="mt-2 bg-gray-700 rounded p-2">
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                        <button
                          onClick={() => { setIsMenuOpen(false); setIsUserDropdownOpen(false); handleSignout(); }} // মেনু ও ড্রপডাউন বন্ধ করে লগআউট
                          className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition mt-2"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
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