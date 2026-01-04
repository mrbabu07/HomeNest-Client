// src/Pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaArrowLeft, FaHeadset, FaMapMarkerAlt } from "react-icons/fa";
import { Home, Search, ArrowLeft, HelpCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-100">
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center mb-12">
          {/* 404 Animation */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[200px] font-bold text-primary mb-4 animate-pulse">
              404
            </h1>
            <div className="text-6xl mb-6">🏠</div>
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
              Page Not Found
            </h2>
            <p className="text-base-content/70 text-lg mb-2 max-w-2xl mx-auto">
              Oops! The property you're looking for seems to have moved to a new address.
            </p>
            <p className="text-base-content/60 mb-8">
              The page you requested doesn't exist or has been relocated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/" className="btn btn-primary gap-2 min-w-[180px]">
              <Home size={20} />
              Go to Home
            </Link>

            <Link to="/properties" className="btn btn-secondary gap-2 min-w-[180px]">
              <Search size={20} />
              Browse Properties
            </Link>

            <button
              onClick={handleGoBack}
              className="btn btn-ghost gap-2 min-w-[180px]"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>
        </div>

        {/* Popular Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Quick Links Card */}
          <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FaMapMarkerAlt className="text-xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-base-content">Quick Links</h3>
            </div>
            <div className="space-y-2">
              <Link
                to="/"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors group"
              >
                <span className="text-base-content group-hover:text-primary">Home</span>
                <FaArrowLeft className="text-base-content/40 group-hover:text-primary transform group-hover:-translate-x-1 transition-all" />
              </Link>
              <Link
                to="/properties"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors group"
              >
                <span className="text-base-content group-hover:text-primary">
                  All Properties
                </span>
                <FaArrowLeft className="text-base-content/40 group-hover:text-primary transform group-hover:-translate-x-1 transition-all" />
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors group"
              >
                <span className="text-base-content group-hover:text-primary">About Us</span>
                <FaArrowLeft className="text-base-content/40 group-hover:text-primary transform group-hover:-translate-x-1 transition-all" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors group"
              >
                <span className="text-base-content group-hover:text-primary">Contact</span>
                <FaArrowLeft className="text-base-content/40 group-hover:text-primary transform group-hover:-translate-x-1 transition-all" />
              </Link>
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-xl font-bold">Need Help?</h3>
            </div>
            <p className="mb-6 opacity-90">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div className="space-y-3">
              <Link
                to="/contact"
                className="btn btn-outline border-white/30 hover:bg-white/20 hover:border-white/50 text-white w-full justify-start gap-2"
              >
                <FaHeadset />
                Contact Support
              </Link>
              <Link
                to="/faq"
                className="btn btn-outline border-white/30 hover:bg-white/20 hover:border-white/50 text-white w-full justify-start gap-2"
              >
                <HelpCircle size={18} />
                Visit FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-8 text-center">
          <h3 className="text-xl font-bold text-base-content mb-3">
            Try Searching for Properties
          </h3>
          <p className="text-base-content/70 mb-6">
            Find your dream home from our extensive collection
          </p>
          <div className="max-w-md mx-auto">
            <Link
              to="/properties"
              className="btn btn-primary btn-block gap-2"
            >
              <FaSearch />
              Browse All Properties
            </Link>
          </div>
        </div>

        {/* Error Code */}
        <div className="mt-8 text-center">
          <p className="text-sm text-base-content/50">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;