// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";
// import { FaSpinner, FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// const MyProperties = () => {
//   const { user } = useContext(AuthContext);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     setLoading(true);

//     axios
//       .get("http://localhost:3000/myServices", {
//         params: { email: user.email },
//       })
//       .then((res) => {
//         setProperties(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Couldn't load your properties.");
//         setLoading(false);
//       });
//   }, [user]);

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to undo this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(
//         `http://localhost:3000/deleteService/${id}`
//       );

//       setProperties((prev) => prev.filter((p) => p._id !== id));

//       toast.success("Property deleted successfully!");

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Property has been removed.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch {
//       toast.error("Failed to delete property.");

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong!",
//       });
//     }
//   };
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
//           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-2xl text-primary-content">🏠</span>
//           </div>
//           <h3 className="text-xl font-bold text-base-content mb-2">
//             Login Required
//           </h3>
//           <p className="text-base-content/70">
//             You must log in to view your properties.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <FaSpinner className="animate-spin text-5xl text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-100 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-base-content">
//             My Properties
//           </h1>
//           <p className="text-base-content/70 mt-2">
//             Manage all your listed properties
//           </p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="text-center py-16 bg-base-100 rounded-lg shadow border border-base-200 max-w-2xl mx-auto">
//             <div className="text-5xl mb-4 text-base-content/50">🏠</div>
//             <h3 className="text-xl font-semibold text-base-content mb-2">
//               No Properties Yet
//             </h3>
//             <p className="text-base-content/70 mb-6">
//               Start by adding your first property
//             </p>
//             <Link
//               to="/add-property"
//               className="inline-block px-6 py-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
//             >
//               Add Property
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-base-100 rounded-lg shadow border border-base-200 overflow-hidden">
//             {/* Desktop Table */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-base-200 text-base-content">
//                   <tr>
//                     <th className="p-4 text-left font-semibold">Image</th>
//                     <th className="p-4 text-left font-semibold">Name</th>
//                     <th className="p-4 text-left font-semibold">Category</th>
//                     <th className="p-4 text-left font-semibold">Price</th>
//                     <th className="p-4 text-left font-semibold">Location</th>
//                     <th className="p-4 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-base-200">
//                   {properties.map((p) => (
//                     <tr key={p._id} className="hover:bg-base-200 transition">
//                       <td className="p-4">
//                         <img
//                           src={p.imageURL || "https://via.placeholder.com/150"}
//                           alt={p.name}
//                           className="h-16 w-24 object-cover rounded-lg"
//                           onError={(e) => {
//                             e.target.src = "https://via.placeholder.com/150";
//                           }}
//                         />
//                       </td>
//                       <td className="p-4 font-medium text-base-content">
//                         {p.name}
//                       </td>
//                       <td className="p-4">
//                         <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
//                           {p.category}
//                         </span>
//                       </td>
//                       <td className="p-4 font-bold text-base-content">
//                         ৳{p.price?.toLocaleString()}
//                       </td>
//                       <td className="p-4 text-base-content/80">{p.location}</td>
//                       <td className="p-4">
//                         <div className="flex justify-center gap-2">
//                           <Link
//                             to={`/property/${p._id}`}
//                             className="p-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaEye />
//                           </Link>
//                           <Link
//                             to={`/update-property/${p._id}`}
//                             className="p-2 bg-green-800 text-secondary-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaEdit />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(p._id)}
//                             className="p-2 bg-red-400 text-error-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden divide-y divide-base-200">
//               {properties.map((p) => (
//                 <div key={p._id} className="p-4">
//                   <div className="flex gap-4">
//                     <img
//                       src={p.imageURL || "https://via.placeholder.com/150"}
//                       alt={p.name}
//                       className="h-24 w-32 object-cover rounded-lg"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-base-content mb-1">
//                         {p.name}
//                       </h3>
//                       <p className="text-sm text-base-content/70 mb-1">
//                         {p.location}
//                       </p>
//                       <p className="font-bold text-base-content">
//                         ৳{p.price?.toLocaleString()}
//                       </p>
//                       <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
//                         {p.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-3 gap-2 mt-4">
//                     <Link
//                       to={`/property/${p._id}`}
//                       className="px-3 py-2 bg-primary text-primary-content text-center rounded-lg hover:opacity-90 transition"
//                     >
//                       View
//                     </Link>
//                     <Link
//                       to={`/update-property/${p._id}`}
//                       className="px-3 py-2 bg-secondary text-secondary-content text-center rounded-lg hover:opacity-90 transition"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="px-3 py-2 bg-error text-error-content rounded-lg hover:opacity-90 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProperties;

// src/Pages/MyProperties.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import {
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaHome,
  FaBuilding,
  FaStar,
  FaHeart,
  FaFileExport,
  FaPlus,
  FaSearch,
  FaFilter,
  FaSort,
  FaChartLine,
  FaDollarSign,
  FaCalendar,
  FaMapMarkerAlt,
  FaDownload,
  FaPrint,
  FaShareAlt,
  FaTh,
  FaList,
  FaBed,
  FaBath,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [viewMode, setViewMode] = useState("table"); // table | grid | list
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!user?.email) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:3000/myServices", {
        params: { email: user.email },
      })
      .then((res) => {
        setProperties(Array.isArray(res.data) ? res.data : []);
        setFilteredProperties(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading properties:", error);
        toast.error("Couldn't load your properties.");
        setProperties([]);
        setFilteredProperties([]);
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [properties, searchTerm, sortBy, filterCategory]);

  const applyFiltersAndSort = () => {
    let filtered = [...properties];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(p =>
        p.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price_desc":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    setFilteredProperties(filtered);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/deleteService/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully!");

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Property has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete property.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) {
      toast.info("No properties selected");
      return;
    }

    const result = await Swal.fire({
      title: `Delete ${selectedProperties.length} properties?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete all",
    });

    if (!result.isConfirmed) return;

    try {
      await Promise.all(
        selectedProperties.map(id =>
          axios.delete(`http://localhost:3000/deleteService/${id}`)
        )
      );
      setProperties(prev => prev.filter(p => !selectedProperties.includes(p._id)));
      setSelectedProperties([]);
      toast.success(`${selectedProperties.length} properties deleted`);
    } catch (error) {
      toast.error("Failed to delete some properties");
    }
  };

  const handleExportCSV = () => {
    if (filteredProperties.length === 0) {
      toast.info("No properties to export");
      return;
    }

    const headers = [
      "Name", "Category", "Price", "Location", "Owner", "Bedrooms", 
      "Bathrooms", "Area", "Rating", "Reviews", "Posted Date"
    ];
    
    const csvData = filteredProperties.map((p) => [
      p.name,
      p.category,
      p.price,
      p.location,
      p.ownerName,
      p.bedrooms || 0,
      p.bathrooms || 0,
      p.area || "N/A",
      p.rating?.toFixed(1) || "0",
      p.reviews?.length || 0,
      new Date(p.postedDate).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-properties-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Properties exported successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p._id));
    }
  };

  const toggleSelectProperty = (id) => {
    setSelectedProperties(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Calculate statistics
  const stats = {
    total: properties.length,
    forRent: properties.filter((p) => p.category?.toLowerCase() === "rent").length,
    forSale: properties.filter((p) => p.category?.toLowerCase() === "sale").length,
    commercial: properties.filter((p) => p.category?.toLowerCase() === "commercial").length,
    totalValue: properties.reduce((sum, p) => sum + (p.price || 0), 0),
    totalReviews: properties.reduce((sum, p) => sum + (p.reviews?.length || 0), 0),
    avgRating: properties.length > 0
      ? (properties.reduce((sum, p) => sum + (p.rating || 0), 0) / properties.length).toFixed(1)
      : 0,
    avgPrice: properties.length > 0
      ? properties.reduce((sum, p) => sum + (p.price || 0), 0) / properties.length
      : 0,
  };

  const categories = [...new Set(properties.map(p => p.category).filter(Boolean))];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow-xl border border-base-200 max-w-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHome className="text-4xl text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-base-content mb-2">
            Login Required
          </h3>
          <p className="text-base-content/70 mb-6">
            You must log in to view and manage your properties
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <FaSpinner className="animate-spin text-6xl text-primary mb-4" />
        <p className="text-base-content/70 text-lg">Loading your properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-base-content flex items-center gap-3">
                <FaHome className="text-primary" /> My Properties
              </h1>
              <p className="text-base-content/70 mt-2">
                {filteredProperties.length > 0
                  ? `Showing ${filteredProperties.length} of ${properties.length} ${properties.length === 1 ? 'property' : 'properties'}`
                  : "Manage all your listed properties"
                }
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Link to="/add-property" className="btn btn-primary gap-2">
                <FaPlus /> Add Property
              </Link>
              {properties.length > 0 && (
                <>
                  <button onClick={handleExportCSV} className="btn btn-outline gap-2">
                    <FaDownload /> Export
                  </button>
                  <button onClick={handlePrint} className="btn btn-outline gap-2">
                    <FaPrint /> Print
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Statistics Cards */}
          {properties.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm opacity-90">Total Listings</div>
                  <FaHome className="text-3xl opacity-30" />
                </div>
                <div className="text-4xl font-bold">{stats.total}</div>
                <div className="text-xs opacity-75 mt-2">
                  Rent: {stats.forRent} | Sale: {stats.forSale}
                </div>
              </div>

              <div className="bg-gradient-to-br from-success to-success/80 text-success-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm opacity-90">Total Value</div>
                  <FaDollarSign className="text-3xl opacity-30" />
                </div>
                <div className="text-4xl font-bold">
                  ${(stats.totalValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs opacity-75 mt-2">
                  Avg: ${(stats.avgPrice / 1000).toFixed(0)}K
                </div>
              </div>

              <div className="bg-gradient-to-br from-warning to-warning/80 text-warning-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm opacity-90">Avg Rating</div>
                  <FaStar className="text-3xl opacity-30" />
                </div>
                <div className="text-4xl font-bold flex items-center gap-2">
                  {stats.avgRating}
                </div>
                <div className="text-xs opacity-75 mt-2">
                  {stats.totalReviews} total reviews
                </div>
              </div>

              <div className="bg-gradient-to-br from-info to-info/80 text-info-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm opacity-90">Performance</div>
                  <FaChartLine className="text-3xl opacity-30" />
                </div>
                <div className="text-4xl font-bold">
                  {stats.total > 0 ? Math.round((stats.totalReviews / stats.total) * 10) / 10 : 0}
                </div>
                <div className="text-xs opacity-75 mt-2">
                  Reviews per property
                </div>
              </div>
            </div>
          )}

          {/* Search, Filter & View Controls */}
          {properties.length > 0 && (
            <div className="bg-base-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                    <input
                      type="text"
                      placeholder="Search properties by name, location, category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input input-bordered w-full pl-11"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="select select-bordered w-full lg:w-48"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select select-bordered w-full lg:w-48"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>

                {/* View Mode */}
                <div className="btn-group">
                  <button
                    className={`btn ${viewMode === "table" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("table")}
                    title="Table view"
                  >
                    <FaList />
                  </button>
                  <button
                    className={`btn ${viewMode === "grid" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                  >
                    <FaTh />
                  </button>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedProperties.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                  <span className="font-semibold">
                    {selectedProperties.length} selected
                  </span>
                  <button
                    onClick={handleBulkDelete}
                    className="btn btn-error btn-sm gap-2"
                  >
                    <FaTrash /> Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedProperties([])}
                    className="btn btn-ghost btn-sm"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Properties Display */}
        {properties.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-xl shadow border border-base-300 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <FaHome className="text-8xl text-base-content/20" />
            </div>
            <h3 className="text-3xl font-semibold text-base-content mb-3">
              No Properties Yet
            </h3>
            <p className="text-base-content/70 mb-8 text-lg">
              Start by adding your first property to get started
            </p>
            <Link to="/add-property" className="btn btn-primary btn-lg gap-2">
              <FaPlus /> Add Your First Property
            </Link>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No Results Found</h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
                setSortBy("newest");
              }}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "table" ? (
          <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="p-4">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={selectedProperties.length === filteredProperties.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Property Details</th>
                    <th className="p-4 text-left">Location</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-center">Rating</th>
                    <th className="p-4 text-center">Reviews</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {filteredProperties.map((p) => (
                    <tr key={p._id} className="hover:bg-base-200 transition">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={selectedProperties.includes(p._id)}
                          onChange={() => toggleSelectProperty(p._id)}
                        />
                      </td>
                      <td className="p-4">
                        <img
                          src={p.imageURL || "https://placehold.co/150?text=Property  "}
                          alt={p.name}
                          loading="lazy"
                          className="h-16 w-24 object-cover rounded-lg shadow"
                          onError={(e) => e.target.src = "https://placehold.co/150?text=Property  "}
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-base-content max-w-xs truncate">
                          {p.name}
                        </div>
                        <div className="flex gap-2 mt-1">
                          <span className="badge badge-primary badge-sm">{p.category}</span>
                          {p.bedrooms > 0 && (
                            <span className="text-xs text-base-content/70">
                              <FaBed className="inline mr-1" />{p.bedrooms}
                            </span>
                          )}
                          {p.bathrooms > 0 && (
                            <span className="text-xs text-base-content/70">
                              <FaBath className="inline mr-1" />{p.bathrooms}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-base-content/80 max-w-xs truncate">
                        <FaMapMarkerAlt className="inline text-error mr-1" />
                        {p.location}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-lg">${p.price?.toLocaleString()}</div>
                        <div className="text-xs text-base-content/60">
                          {p.category?.toLowerCase() === "rent" ? "/month" : ""}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaStar className="text-warning" />
                          <span className="font-semibold">{p.rating?.toFixed(1) || "0.0"}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="badge badge-ghost">{p.reviews?.length || 0}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/property/${p._id}`}
                            className="btn btn-sm btn-primary"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/update-property/${p._id}`}
                            className="btn btn-sm btn-secondary"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="btn btn-sm btn-error"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-base-200">
              {filteredProperties.map((p) => (
                <div key={p._id} className="p-4">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      className="checkbox mt-2"
                      checked={selectedProperties.includes(p._id)}
                      onChange={() => toggleSelectProperty(p._id)}
                    />
                    <img
                      src={p.imageURL || "https://placehold.co/150?text=Property  "}
                      alt={p.name}
                      loading="lazy"
                      className="h-24 w-32 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => e.target.src = "https://placehold.co/150?text=Property  "}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base-content mb-1 truncate">{p.name}</h3>
                      <p className="text-sm text-base-content/70 mb-1 truncate">{p.location}</p>
                      <p className="font-bold text-lg">${p.price?.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="badge badge-primary badge-sm">{p.category}</span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-warning text-xs" />
                          <span className="text-xs font-semibold">{p.rating?.toFixed(1) || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Link to={`/property/${p._id}`} className="btn btn-sm btn-primary">
                      <FaEye className="mr-1" /> View
                    </Link>
                    <Link to={`/update-property/${p._id}`} className="btn btn-sm btn-secondary">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-error">
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                onDelete={handleDelete}
                isSelected={selectedProperties.includes(p._id)}
                onToggleSelect={toggleSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyCard = ({ property, onDelete, isSelected, onToggleSelect }) => {
  const { _id, name, category, location, price, imageURL, rating, reviews, bedrooms, bathrooms } = property;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all border border-base-200">
      <figure className="relative aspect-video">
        <input
          type="checkbox"
          className="checkbox absolute top-3 left-3 z-10"
          checked={isSelected}
          onChange={() => onToggleSelect(_id)}
        />
        <img
          src={imageURL || "https://placehold.co/400x300?text=Property"}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => e.target.src = "https://placehold.co/400x300?text=Property"}
        />
        <div className="absolute top-3 right-3">
          <span className="badge badge-primary">{category}</span>
        </div>
      </figure>
      <div className="card-body p-5">
        <h2 className="card-title line-clamp-1">{name}</h2>
        <p className="text-sm text-base-content/70 line-clamp-1">
          <FaMapMarkerAlt className="inline text-error mr-1" />
          {location}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-xl">${price?.toLocaleString()}</div>
          <div className="flex items-center gap-1">
            <FaStar className="text-warning" />
            <span className="font-semibold">{rating?.toFixed(1) || "0.0"}</span>
          </div>
        </div>
        <div className="flex gap-4 text-sm text-base-content/70 mt-2">
          {bedrooms > 0 && (
            <span><FaBed className="inline mr-1" />{bedrooms}</span>
          )}
          {bathrooms > 0 && (
            <span><FaBath className="inline mr-1" />{bathrooms}</span>
          )}
          <span>{reviews?.length || 0} reviews</span>
        </div>
        <div className="card-actions justify-between mt-4 pt-4 border-t">
          <Link to={`/property/${_id}`} className="btn btn-sm btn-primary">
            <FaEye /> View
          </Link>
          <Link to={`/update-property/${_id}`} className="btn btn-sm btn-secondary">
            <FaEdit /> Edit
          </Link>
          <button onClick={() => onDelete(_id)} className="btn btn-sm btn-error">
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
