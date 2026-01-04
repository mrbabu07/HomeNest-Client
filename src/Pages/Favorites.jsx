// src/Pages/Favorites.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import {
  FaHeart,
  FaSpinner,
  FaTrash,
  FaStar,
  FaSearch,
  FaDownload,
  FaShareAlt as FaShare,
  FaThLarge,
  FaList,
  FaMapMarkerAlt,
  FaTag,
  FaBed,
  FaBath,
  FaRuler,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, price_asc, price_desc, rating
  const [filterCategory, setFilterCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    totalValue: 0,
    avgPrice: 0,
    avgRating: 0,
    categories: {},
  });

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [favorites, searchTerm, sortBy, filterCategory, priceRange]);

  useEffect(() => {
    calculateStats();
  }, [favorites]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favIds =
        JSON.parse(localStorage.getItem("homenest_favorites")) || [];

      if (favIds.length === 0) {
        setFavorites([]);
        setFilteredFavorites([]);
        setLoading(false);
        return;
      }

      const promises = favIds.map((id) =>
        axios
          .get(`https://home-nest-server-10.vercel.app/singleService/${id}`)
          .catch((err) => {
            console.error(`Failed to fetch property ${id}:`, err);
            return null;
          })
      );

      const responses = await Promise.all(promises);
      const validProperties = responses
        .map((res) => res?.data)
        .filter((property) => property);

      setFavorites(validProperties);

      // Clean up localStorage
      const validIds = validProperties.map((p) => p._id);
      const cleanedIds = favIds.filter((id) => validIds.includes(id));
      if (cleanedIds.length !== favIds.length) {
        localStorage.setItem("homenest_favorites", JSON.stringify(cleanedIds));
      }
    } catch (err) {
      console.error("Error loading favorites:", err);
      setError("Failed to load favorites");
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (favorites.length === 0) {
      setStats({
        total: 0,
        totalValue: 0,
        avgPrice: 0,
        avgRating: 0,
        categories: {},
      });
      return;
    }

    const total = favorites.length;
    const totalValue = favorites.reduce((sum, p) => sum + (p.price || 0), 0);
    const avgPrice = totalValue / total;
    const avgRating =
      favorites.reduce((sum, p) => sum + (p.rating || 0), 0) / total;

    const categories = favorites.reduce((acc, p) => {
      const cat = p.category || "other";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    setStats({ total, totalValue, avgPrice, avgRating, categories });
  };

  const applyFiltersAndSort = () => {
    let filtered = [...favorites];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Price range filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter((p) => {
        const price = p.price || 0;
        const min = priceRange.min === "" ? 0 : Number(priceRange.min);
        const max = priceRange.max === "" ? Infinity : Number(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Sorting
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
        filtered.sort(
          (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
        );
        break;
      default: // newest
        filtered.sort(
          (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
        );
    }

    setFilteredFavorites(filtered);
  };

  const removeFromFavorites = (id, propertyName) => {
    const favIds = JSON.parse(localStorage.getItem("homenest_favorites")) || [];
    const updated = favIds.filter((favId) => favId !== id);
    localStorage.setItem("homenest_favorites", JSON.stringify(updated));
    setFavorites((prev) => prev.filter((p) => p._id !== id));
    toast.success(`Removed "${propertyName}" from favorites`);
  };

  const clearAllFavorites = () => {
    if (favorites.length === 0) return;

    if (window.confirm("Are you sure you want to remove all favorites?")) {
      localStorage.setItem("homenest_favorites", JSON.stringify([]));
      setFavorites([]);
      toast.success("All favorites cleared");
    }
  };

  const handleExportData = () => {
    if (filteredFavorites.length === 0) {
      toast.info("No favorites to export");
      return;
    }

    const headers = [
      "Name",
      "Category",
      "Price",
      "Location",
      "Rating",
      "Bedrooms",
      "Bathrooms",
    ];
    const csvData = filteredFavorites.map((p) => [
      p.name,
      p.category,
      p.price,
      p.location,
      p.rating?.toFixed(1) || "N/A",
      p.bedrooms || 0,
      p.bathrooms || 0,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `favorites-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Favorites exported successfully!");
  };

  const handleShare = () => {
    const text = `Check out my ${favorites.length} favorite properties on HomeNest!`;
    if (navigator.share) {
      navigator
        .share({
          title: "My Favorite Properties",
          text: text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("newest");
    setFilterCategory("all");
    setPriceRange({ min: "", max: "" });
    toast.info("Filters reset");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow-xl border border-base-200 max-w-md">
          <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-4xl text-error" />
          </div>
          <h3 className="text-2xl font-bold text-base-content mb-2">
            Login Required
          </h3>
          <p className="text-base-content/70 mb-6">
            Please log in to view and manage your favorite properties
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Go to Login
          </Link>
        </div>
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
                <FaHeart className="text-error" /> My Favorites
              </h1>
              <p className="text-base-content/70 mt-2">
                {filteredFavorites.length > 0
                  ? `Showing ${filteredFavorites.length} of ${
                      favorites.length
                    } ${favorites.length === 1 ? "property" : "properties"}`
                  : "Your saved properties for later"}
              </p>
            </div>

            {/* Action Buttons */}
            {favorites.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleShare}
                  className="btn btn-outline btn-sm gap-2"
                  title="Share favorites"
                >
                  <FaShare /> Share
                </button>
                <button
                  onClick={handleExportData}
                  className="btn btn-outline btn-sm gap-2"
                  title="Export to CSV"
                >
                  <FaDownload /> Export
                </button>
                <button
                  onClick={clearAllFavorites}
                  className="btn btn-outline btn-error btn-sm gap-2"
                >
                  <FaTrash /> Clear All
                </button>
              </div>
            )}
          </div>

          {/* Statistics Cards */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-content p-5 rounded-xl shadow-lg">
                <div className="text-sm opacity-90 mb-1">Total Favorites</div>
                <div className="text-3xl font-bold">{stats.total}</div>
              </div>

              <div className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content p-5 rounded-xl shadow-lg">
                <div className="text-sm opacity-90 mb-1">Total Value</div>
                <div className="text-3xl font-bold">
                  ${(stats.totalValue / 1000000).toFixed(1)}M
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-content p-5 rounded-xl shadow-lg">
                <div className="text-sm opacity-90 mb-1">Avg. Price</div>
                <div className="text-3xl font-bold">
                  ${(stats.avgPrice / 1000).toFixed(0)}K
                </div>
              </div>

              <div className="bg-gradient-to-br from-warning to-warning/80 text-warning-content p-5 rounded-xl shadow-lg">
                <div className="text-sm opacity-90 mb-1">Avg. Rating</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <FaStar /> {stats.avgRating.toFixed(1)}
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Section */}
          {favorites.length > 0 && (
            <div className="bg-base-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
                    <input
                      type="text"
                      placeholder="Search by name, location..."
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
                  {Object.keys(stats.categories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)} (
                      {stats.categories[cat]})
                    </option>
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

                {/* View Mode Toggle */}
                <div className="btn-group">
                  <button
                    className={`btn ${viewMode === "grid" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                  >
                    <FaThLarge />
                  </button>
                  <button
                    className={`btn ${viewMode === "list" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("list")}
                    title="List view"
                  >
                    <FaList />
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Min Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="$0"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      } // Fixed typo: min: prev.min → min: e.target.value
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Max Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Any"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <button onClick={resetFilters} className="btn btn-ghost btn-sm">
                  Reset Filters
                </button>
              </div>

              {/* Active Filters Info */}
              {(searchTerm ||
                filterCategory !== "all" ||
                priceRange.min ||
                priceRange.max) && (
                <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="font-semibold">Active Filters:</span>
                  {searchTerm && (
                    <span className="badge badge-primary gap-1">
                      Search: {searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filterCategory !== "all" && (
                    <span className="badge badge-secondary gap-1">
                      Category: {filterCategory}
                      <button
                        onClick={() => setFilterCategory("all")}
                        className="ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(priceRange.min || priceRange.max) && (
                    <span className="badge badge-accent gap-1">
                      Price: ${priceRange.min || 0} - ${priceRange.max || "∞"}
                      <button
                        onClick={() => setPriceRange({ min: "", max: "" })}
                        className="ml-1"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-6xl text-primary mb-4" />
            <p className="text-base-content/70 text-lg">
              Loading your favorites...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-error/10 rounded-xl border border-error/20 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-error mb-2">Error</h3>
            <p className="text-base-content/70 mb-6">{error}</p>
            <button onClick={fetchFavorites} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-xl border-2 border-dashed border-base-300 max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <FaHeart className="text-8xl text-error/20" />
            </div>
            <h3 className="text-3xl font-semibold text-base-content mb-3">
              No Favorites Yet
            </h3>
            <p className="text-base-content/70 mb-8 max-w-md mx-auto text-lg">
              Start exploring and save properties you love by clicking the heart
              icon!
            </p>
            <Link to="/properties" className="btn btn-primary btn-lg gap-2">
              <FaMapMarkerAlt /> Browse Properties
            </Link>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-xl max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-base-content mb-2">
              No Results Found
            </h3>
            <p className="text-base-content/70 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavorites.map((property) => (
                  <FavoritePropertyCard
                    key={property._id}
                    property={property}
                    onRemove={removeFromFavorites}
                  />
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {filteredFavorites.map((property) => (
                  <FavoritePropertyListItem
                    key={property._id}
                    property={property}
                    onRemove={removeFromFavorites}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Grid Card Component
const FavoritePropertyCard = ({ property, onRemove }) => {
  const {
    _id,
    name,
    category,
    description,
    location,
    price,
    imageURL,
    imageURLs,
    rating = 0,
    bedrooms,
    bathrooms,
    area,
  } = property;

  const displayImage =
    imageURLs?.[0] || imageURL || "https://placehold.co/400x300?text=Property";
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  const getCategoryColor = (cat) => {
    const colors = {
      rent: "badge-info",
      sale: "badge-primary",
      commercial: "badge-secondary",
      land: "badge-accent",
    };
    return colors[cat?.toLowerCase()] || "badge-neutral";
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 group">
      <figure className="relative aspect-video overflow-hidden">
        <Link to={`/property/${_id}`}>
          <img
            src={displayImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=Property";
            }}
          />
        </Link>

        <button
          onClick={() => onRemove(_id, name)}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-base-100/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 hover:bg-error group/btn"
          aria-label="Remove from favorites"
        >
          <FaHeart className="text-error w-5 h-5 group-hover/btn:text-base-100 transition-colors" />
        </button>

        <div className="absolute top-3 left-3 z-10">
          <span
            className={`badge ${getCategoryColor(
              category
            )} badge-lg font-semibold`}
          >
            {category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-base-100/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center gap-1.5">
              <FaTag className="w-3.5 h-3.5 text-success" />
              <span className="font-bold text-base-content text-lg">
                ${formattedPrice}
              </span>
              {category?.toLowerCase() === "rent" && (
                <span className="text-xs text-base-content/70">/mo</span>
              )}
            </div>
          </div>
        </div>
      </figure>

      <div className="card-body p-5">
        <Link to={`/property/${_id}`}>
          <h2 className="card-title text-lg hover:text-primary transition-colors line-clamp-2">
            {name}
          </h2>
        </Link>

        <div className="flex items-center gap-2 text-base-content/70 text-sm mb-2">
          <FaMapMarkerAlt className="text-error flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <p className="text-base-content/70 text-sm line-clamp-2 mb-3">
          {description}
        </p>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-base-content/70 mb-3">
          {bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <FaBed className="text-primary" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <FaBath className="text-secondary" />
              <span>{bathrooms}</span>
            </div>
          )}
          {area && (
            <div className="flex items-center gap-1">
              <FaRuler className="text-accent" />
              <span>{area}</span>
            </div>
          )}
        </div>

        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-warning" />
            <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            <span className="text-xs text-base-content/60">rating</span>
          </div>
        )}

        <div className="card-actions justify-between items-center mt-2 pt-3 border-t border-base-200">
          <Link
            to={`/property/${_id}`}
            className="btn btn-primary btn-sm flex-1"
          >
            View Details
          </Link>
          <button
            onClick={() => onRemove(_id, name)}
            className="btn btn-ghost btn-sm btn-square text-error hover:bg-error/10"
            title="Remove"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

// List View Component
const FavoritePropertyListItem = ({ property, onRemove }) => {
  const {
    _id,
    name,
    category,
    description,
    location,
    price,
    imageURL,
    imageURLs,
    rating = 0,
    bedrooms,
    bathrooms,
    area,
  } = property;

  const displayImage =
    imageURLs?.[0] || imageURL || "https://placehold.co/400x300?text=Property";
  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  return (
    <div className="card card-side bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200">
      <figure className="w-64 flex-shrink-0">
        <Link to={`/property/${_id}`}>
          <img
            src={displayImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=Property";
            }}
          />
        </Link>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Link to={`/property/${_id}`}>
              <h2 className="card-title hover:text-primary transition-colors">
                {name}
              </h2>
            </Link>
            <div className="flex items-center gap-2 text-base-content/70 text-sm mt-1">
              <FaMapMarkerAlt className="text-error" />
              <span>{location}</span>
            </div>
          </div>
          <button
            onClick={() => onRemove(_id, name)}
            className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10"
          >
            <FaHeart className="text-xl" />
          </button>
        </div>

        <p className="text-base-content/70 line-clamp-2 mt-2">{description}</p>

        <div className="flex flex-wrap items-center gap-4 mt-3">
          <span className="badge badge-primary">{category}</span>
          <div className="font-bold text-xl text-base-content">
            ${formattedPrice}
            {category?.toLowerCase() === "rent" && (
              <span className="text-sm text-base-content/70">/mo</span>
            )}
          </div>
          {rating > 0 && (
            <div className="flex items-center gap-1">
              <FaStar className="text-warning" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
          {bedrooms > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <FaBed className="text-primary" />
              <span>{bedrooms} beds</span>
            </div>
          )}
          {bathrooms > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <FaBath className="text-secondary" />
              <span>{bathrooms} baths</span>
            </div>
          )}
          {area && (
            <div className="flex items-center gap-1 text-sm">
              <FaRuler className="text-accent" />
              <span>{area}</span>
            </div>
          )}
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/property/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
          <button
            onClick={() => onRemove(_id, name)}
            className="btn btn-ghost btn-sm text-error"
          >
            <FaTrash className="mr-1" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
