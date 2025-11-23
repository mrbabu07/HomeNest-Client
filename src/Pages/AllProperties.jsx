// src/Pages/AllProperties.jsx

import React, { useState, useEffect } from "react";
import PropertyCard from "../Component/PropertyCard";
import { FaSpinner, FaSearch } from "react-icons/fa";
import axios from "axios";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // -------- Fetch data from server ----------
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/allServices");
      setProperties(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------- Local Search + Sort ----------
  const filtered = properties
    .filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "newest":
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return b._id.localeCompare(a._id);
        case "oldest":
          if (a.createdAt && b.createdAt) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return a._id.localeCompare(b._id);
        default:
          return 0;
      }
    });

  return (
    <div className="p-6 max-w-7xl mx-auto dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Properties
      </h2>

      {/* Search + Sort */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Search by Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-blue-400" />
        </div>
      )}

      {/* Property List */}
      {!loading && (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No properties found matching your search.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AllProperties;