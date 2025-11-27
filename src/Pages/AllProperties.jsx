import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropertyCard from "../Component/PropertyCard";
import { FaSpinner, FaSearch, FaFilter, FaHome, FaSortAmountDown } from "react-icons/fa";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Load properties from /allServices WITH search & sort params
  const loadProperties = async () => {
    setLoading(true);
    try {
      const baseUrl = "http://localhost:3000/allServices";
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      params.append("sortBy", sortOption);

      const response = await axios.get(`${baseUrl}?${params}`);

      if (Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      toast.error("Failed to load properties.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [searchTerm, sortOption]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-10" data-aos="fade-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-lg shadow-blue-500/25 dark:shadow-blue-400/20 mb-5 transition-all duration-500 hover:scale-110 hover:rotate-3">
            <FaHome className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-500">
            All Properties
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-500">
            Discover amazing properties tailored to your dreams
          </p>
        </div>

        {/* Search & Sort Card */}
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500" data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-5">
            
            {/* Search Input */}
            <div className="flex-1">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                <FaSearch className="text-blue-600 dark:text-blue-400" />
                Search by Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="e.g. Gulshan Apartment"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 outline-none transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-red-500 dark:hover:bg-red-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-64">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                <FaSortAmountDown className="text-indigo-600 dark:text-indigo-400" />
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-5 py-3 pr-10 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer focus:border-indigo-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-300"
                >
                  <option value="price_asc">💰 Price: Low to High</option>
                  <option value="price_desc">💎 Price: High to Low</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                </select>
                <FaFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none transition-colors duration-500" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mt-5 pt-5 border-t border-gray-300 dark:border-gray-600 transition-colors duration-500">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-500">
                <span className="font-bold text-blue-600 dark:text-indigo-400">{properties.length}</span> properties found
                {searchTerm && (
                  <span> matching <span className="font-semibold text-gray-800 dark:text-gray-200">"{searchTerm}"</span></span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500" data-aos="fade-up">
            <div className="relative w-16 h-16 mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700 transition-colors duration-500"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-indigo-400 animate-spin transition-colors duration-500"></div>
            </div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-500">
              Loading properties...
            </p>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500" data-aos="fade-up">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500">
              <FaSearch className="text-3xl text-gray-500 dark:text-gray-400 transition-colors duration-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-500">
              No Properties Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto transition-colors duration-500">
              {searchTerm 
                ? `We couldn't find any properties matching "${searchTerm}"`
                : "No properties available at the moment"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllProperties;