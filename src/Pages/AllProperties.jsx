// src/Pages/AllProperties.jsx
import React, { useState, useEffect } from 'react';
import PropertyCard from '../Component/PropertyCard';
import { FaSpinner, FaSearch } from 'react-icons/fa';
import axios from 'axios';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and Sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState('desc');

  // Function to get properties from server
  const getProperties = () => {
    setLoading(true);
    setError(null);

    axios
      .get('http://localhost:3000/allServices', {
        params: {
          
          search: searchTerm,
          sortField: sortOption,
          sortOrder: sortOrder,
        },
      })
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch properties.');
        setLoading(false);
      });
  };

  // Fetch properties whenever search term or sort changes
  useEffect(() => {
    // small delay so search is smoother
    const timer = setTimeout(() => {
      getProperties();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, sortOption, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('_');
    setSortOption(field);
    setSortOrder(order);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        All Properties
      </h2>

      {/* Search and Sort controls */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="searchInput"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Search by Property Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="searchInput"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label
            htmlFor="sortSelect"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Sort By
          </label>
          <select
            id="sortSelect"
            value={`${sortOption}_${sortOrder}`}
            onChange={handleSortChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="dateAdded_desc">Newest First</option>
            <option value="dateAdded_asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      )}

      {/* Error */}
      {error && <p className="text-center text-red-500 p-4">{error}</p>}

      {/* Properties list */}
      {!loading && !error && (
        <>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={{ ...property, showPostedBy: true }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No properties found matching your search.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AllProperties;
