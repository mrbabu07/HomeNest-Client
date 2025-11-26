// src/Pages/AllProperties.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ replace console.log with toast
import PropertyCard from "../Component/PropertyCard";
import { FaSpinner, FaSearch } from "react-icons/fa";

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
      toast.error("Failed to load properties."); // ✅ no console.log
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [searchTerm, sortOption]); // ✅ re-fetch when search or sort changes

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Properties
      </h2>

      {/* Search + Sort */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Search by Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Gulshan Apartment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Sort */}
        <div className="w-full md:w-48">
          <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          No properties found.
        </div>
      )}
    </div>
  );
};

export default AllProperties;