import React from "react";
import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to from-gray-900 to-gray-800">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-500 mb-4 animate-pulse">
            404
          </h1>
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Looks like this page went for a walk and didn't come back. Let's get
            you back on track!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <Home size={20} />
            Go Home
          </Link>

          <Link
            to="/services"
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            <Search size={20} />
            Browse Services
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 font-semibold border border-gray-600"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-gray-800 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-3">Need Help?</h3>
          <p className="text-gray-400 mb-4">
            If you think this is a mistake, please contact our support team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <span className="text-gray-500">Popular pages:</span>
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              Home
            </Link>
            <Link to="/services" className="text-blue-400 hover:text-blue-300">
              Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
