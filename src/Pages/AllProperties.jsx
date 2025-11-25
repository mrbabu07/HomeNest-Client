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

  // -------- Fetch ALL services ----------
  const loadData = async () => {
    try {
      setLoading(true);

      // ❗ We will use a NEW backend route that returns ALL properties
      const res = await axios.get("http://localhost:3000/AllServices");

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
          return b._id.localeCompare(a._id);
        case "oldest":
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
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Search by Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="block mb-1 font-medium">Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border rounded"
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
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
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
            <p className="text-center text-gray-500 py-10">
              No properties found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AllProperties;
