import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../Component/PropertyCard";
import { FaSpinner, FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);   // All property data
  const [loading, setLoading] = useState(true);       // Loader

  const [searchTerm, setSearchTerm] = useState("");   // Search text
  const [sortOption, setSortOption] = useState("newest"); // Dropdown sort

  // ------------------------------
  // Load all properties from backend
  // ------------------------------
  const loadProperties = async () => {
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/AllServices");

      // Keep it very simple
      if (Array.isArray(response.data)) {
        setProperties(response.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  // ------------------------------
  // Search + Sorting (simple)
  // ------------------------------
  let filteredProperties = properties.filter((item) => {
    return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (sortOption === "price_asc") {
    filteredProperties.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "price_desc") {
    filteredProperties.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "newest") {
    filteredProperties.sort((a, b) => b._id.localeCompare(a._id));
  }

  if (sortOption === "oldest") {
    filteredProperties.sort((a, b) => a._id.localeCompare(b._id));
  }

  // ------------------------------
  // JSX
  // ------------------------------
  return (
    <div className="p-6 max-w-7xl mx-auto dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Properties
      </h2>

      {/* Search + Sort Section */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-4">

        {/* Search */}
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

        {/* Sort Dropdown */}
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
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No properties found.
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllProperties;
