// src/Pages/AllProperties.jsx
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

  const loadProperties = async () => {
    setLoading(true);
    try {
      const baseUrl = "http://localhost:3000/allServices";
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      params.append("sortBy", sortOption);

      const response = await axios.get(`${baseUrl}?${params}`);
      setProperties(Array.isArray(response.data) ? response.data : []);
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
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
            <FaHome className="text-xl text-primary-content" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            All Properties
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover amazing properties tailored to your dreams
          </p>
        </div>

        {/* Search & Sort */}
        <div className="mb-8 p-6 bg-base-100 rounded-xl shadow border border-base-200">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Search */}
            <div className="flex-1">
              <label className="flex items-center gap-2 mb-3 font-medium text-base-content">
                <FaSearch className="text-primary" />
                Search by Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Gulshan Apartment"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-error"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="w-full md:w-64">
              <label className="flex items-center gap-2 mb-3 font-medium text-base-content">
                <FaSortAmountDown className="text-primary" />
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full px-4 py-2.5 pr-8 border border-base-200 rounded-lg bg-base-100 text-base-content appearance-none cursor-pointer focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="price_asc">💰 Price: Low to High</option>
                  <option value="price_desc">💎 Price: High to Low</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                </select>
                <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mt-4 pt-4 border-t border-base-200">
              <p className="text-sm text-base-content/70">
                <span className="font-bold text-primary">{properties.length}</span> properties found
                {searchTerm && (
                  <> matching <span className="font-medium">"{searchTerm}"</span></>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-xl border border-base-200">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-2xl text-base-content/50" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No Properties Found
            </h3>
            <p className="text-base-content/70 max-w-md mx-auto">
              {searchTerm
                ? `We couldn't find any properties matching "${searchTerm}"`
                : "No properties available at the moment"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-6 py-2 bg-primary text-primary-content font-medium rounded-lg hover:opacity-90 transition"
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