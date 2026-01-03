// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import PropertyCard from "../Component/PropertyCard";
// import {
//   FaSpinner,
//   FaSearch,
//   FaFilter,
//   FaHome,
//   FaSortAmountDown,
// } from "react-icons/fa";

// const AllProperties = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("newest");

//   const loadProperties = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();

//       if (searchTerm) {
//         params.append("search", searchTerm);
//       }

//       params.append("sortBy", sortOption);

//       // Direct full URL (no baseUrl variable)
//       const response = await axios.get(
//         `http://localhost:3000/allServices?${params.toString()}`
//       );

//       setProperties(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       toast.error("Failed to load properties.");
//       setProperties([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProperties();
//   }, [searchTerm, sortOption]);

//   return (
//     <div className="bg-base-100 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
//             <FaHome className="text-xl text-primary-content" />
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//             All Properties
//           </h2>
//           <p className="text-base-content/70 max-w-2xl mx-auto">
//             Discover amazing properties tailored to your dreams
//           </p>
//         </div>

//         {/* Search & Sort */}
//         <div className="mb-8 p-6 bg-base-100 rounded-xl shadow border border-base-200">
//           <div className="flex flex-col md:flex-row gap-5">
//             {/* Search */}
//             <div className="flex-1">
//               <label className="flex items-center gap-2 mb-3 font-medium text-base-content">
//                 <FaSearch className="text-primary" />
//                 Search by Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="e.g. Gulshan Apartment"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-2.5 pl-10 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
//                 />
//                 <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-error"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Sort */}
//             <div className="w-full md:w-64">
//               <label className="flex items-center gap-2 mb-3 font-medium text-base-content">
//                 <FaSortAmountDown className="text-primary" />
//                 Sort By
//               </label>
//               <div className="relative">
//                 <select
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                   className="w-full px-4 py-2.5 pr-8 border border-base-200 rounded-lg bg-base-100 text-base-content appearance-none cursor-pointer focus:ring-2 focus:ring-primary outline-none"
//                 >
//                   <option value="price_asc">💰 Price: Low to High</option>
//                   <option value="price_desc">💎 Price: High to Low</option>
//                   <option value="newest">🆕 Newest First</option>
//                   <option value="oldest">📅 Oldest First</option>
//                 </select>
//                 <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Results Count */}
//           {!loading && (
//             <div className="mt-4 pt-4 border-t border-base-200">
//               <p className="text-sm text-base-content/70">
//                 <span className="font-bold text-primary">
//                   {properties.length}
//                 </span>{" "}
//                 properties found
//                 {searchTerm && (
//                   <>
//                     {" "}
//                     matching <span className="font-medium">"{searchTerm}"</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Loading */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : properties.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {properties.map((property) => (
//               <PropertyCard key={property._id} property={property} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16 bg-base-100 rounded-xl border border-base-200">
//             <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaSearch className="text-2xl text-base-content/50" />
//             </div>
//             <h3 className="text-xl font-semibold text-base-content mb-2">
//               No Properties Found
//             </h3>
//             <p className="text-base-content/70 max-w-md mx-auto">
//               {searchTerm
//                 ? `We couldn't find any properties matching "${searchTerm}"`
//                 : "No properties available at the moment"}
//             </p>
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="mt-4 px-6 py-2 bg-primary text-primary-content font-medium rounded-lg hover:opacity-90 transition"
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllProperties;

// src/Pages/AllProperties.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PropertyCard from "../Component/PropertyCard";
import { debounce } from "lodash";
import {
  FaSpinner,
  FaSearch,
  FaFilter,
  FaHome,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

const AllProperties = () => {
  // State management
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [immediateSearch, setImmediateSearch] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const itemsPerPage = 8;

  // Category options (customize based on your backend)
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "rent", label: "For Rent" },
    { value: "sale", label: "For Sale" },
    { value: "commercial", label: "Commercial" },
    { value: "land", label: "Land" },
  ];

  // Debounced search effect
  useEffect(() => {
    const handler = debounce(() => {
      setSearchTerm(immediateSearch);
    }, 400);

    handler();
    return () => handler.cancel();
  }, [immediateSearch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, categoryFilter]);

  // Load properties with all filters
  const loadProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      params.append("sortBy", sortOption);
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      const response = await axios.get(
        `http://localhost:3000/allServices?${params.toString()}`
      );

      // Handle paginated response
      if (response.data.properties) {
        setProperties(response.data.properties);
        setTotalPages(response.data.totalPages || 1);
        setTotalResults(response.data.total || response.data.properties.length);
      } else {
        // Fallback for non-paginated backend
        const allProperties = Array.isArray(response.data) ? response.data : [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setProperties(allProperties.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(allProperties.length / itemsPerPage) || 1);
        setTotalResults(allProperties.length);
      }
    } catch (error) {
      console.error("Error loading properties:", error);
      toast.error(error.response?.data?.message || "Failed to load properties");
      setProperties([]);
      setTotalPages(1);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Load properties when dependencies change
  useEffect(() => {
    loadProperties();
  }, [searchTerm, sortOption, categoryFilter, currentPage]);

  // Clear all filters
  const clearAllFilters = () => {
    setImmediateSearch("");
    setSearchTerm("");
    setCategoryFilter("all");
    setSortOption("newest");
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm || categoryFilter !== "all" || sortOption !== "newest";

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = useMemo(
    () => getPageNumbers(),
    [currentPage, totalPages]
  );

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
            <FaHome className="text-xl text-primary-content" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
            All Properties
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Discover amazing properties tailored to your dreams
          </p>
        </div>

        {/* Search, Filter & Sort Panel */}
        <div className="mb-8 p-6 bg-base-100 rounded-xl shadow-lg border border-base-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Search Input */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-medium text-base-content text-sm">
                <FaSearch className="text-primary" />
                Search by Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Gulshan Apartment"
                  value={immediateSearch}
                  onChange={(e) => setImmediateSearch(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 text-sm" />
                {immediateSearch && (
                  <button
                    onClick={() => {
                      setImmediateSearch("");
                      setSearchTerm("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-error transition-colors"
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-medium text-base-content text-sm">
                <FaFilter className="text-primary" />
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content appearance-none cursor-pointer focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-medium text-base-content text-sm">
                <FaSortAmountDown className="text-primary" />
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content appearance-none cursor-pointer focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="price_asc">💰 Price: Low to High</option>
                <option value="price_desc">💎 Price: High to Low</option>
                <option value="newest">🆕 Newest First</option>
                <option value="oldest">📅 Oldest First</option>
              </select>
            </div>
          </div>

          {/* Results Info & Clear Filters */}
          {!loading && (
            <div className="mt-4 pt-4 border-t border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-sm text-base-content/70">
                {properties.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-bold text-base-content">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>
                    –
                    <span className="font-bold text-base-content">
                      {Math.min(currentPage * itemsPerPage, totalResults)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-primary">
                      {totalResults}
                    </span>{" "}
                    {totalResults === 1 ? "property" : "properties"}
                    {searchTerm && (
                      <>
                        {" "}
                        matching{" "}
                        <span className="font-medium">"{searchTerm}"</span>
                      </>
                    )}
                  </>
                ) : (
                  "No properties found"
                )}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="btn btn-sm btn-ghost gap-2 text-error hover:bg-error/10"
                >
                  <FaTimes />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-base-content/70">Loading properties...</p>
          </div>
        ) : properties.length > 0 ? (
          <>
            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
                <div className="join shadow-md">
                  {/* Previous Button */}
                  <button
                    className="join-item btn btn-outline"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    aria-label="Previous page"
                  >
                    <FaChevronLeft />
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((pageNum, idx) => {
                    if (pageNum === "...") {
                      return (
                        <button
                          key={`ellipsis-${idx}`}
                          className="join-item btn btn-disabled"
                          disabled
                        >
                          ...
                        </button>
                      );
                    }

                    return (
                      <button
                        key={pageNum}
                        className={`join-item btn ${
                          currentPage === pageNum
                            ? "btn-primary"
                            : "btn-outline"
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    className="join-item btn btn-outline"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    aria-label="Next page"
                  >
                    <FaChevronRight />
                  </button>
                </div>

                {/* Page Info */}
                <span className="text-sm text-base-content/70">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-base-100 rounded-xl border-2 border-dashed border-base-300">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-2">
              No Properties Found
            </h3>
            <p className="text-base-content/70 max-w-md mx-auto mb-6">
              {searchTerm
                ? `We couldn't find any properties matching "${searchTerm}"`
                : categoryFilter !== "all"
                ? `No properties in the "${
                    categories.find((c) => c.value === categoryFilter)?.label
                  }" category`
                : "No properties available at the moment"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="btn btn-primary gap-2"
              >
                <FaTimes />
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
