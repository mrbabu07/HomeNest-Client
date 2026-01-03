// src/Pages/Favorites.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { FaHeart, FaSpinner, FaTrash, FaStar, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const favIds = JSON.parse(localStorage.getItem("homenest_favorites")) || [];
      
      if (favIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      // Fetch all favorite properties
      const promises = favIds.map(id => 
        axios.get(`http://localhost:3000/singleService/${id}`)
          .catch(err => {
            console.error(`Failed to fetch property ${id}:`, err);
            return null; // Return null for failed requests
          })
      );
      
      const responses = await Promise.all(promises);
      const validProperties = responses
        .map(res => res?.data)
        .filter(property => property); // Remove null/undefined
      
      setFavorites(validProperties);
      
      // Clean up localStorage - remove invalid IDs
      const validIds = validProperties.map(p => p._id);
      const cleanedIds = favIds.filter(id => validIds.includes(id));
      if (cleanedIds.length !== favIds.length) {
        localStorage.setItem("homenest_favorites", JSON.stringify(cleanedIds));
      }
    } catch (err) {
      console.error("Error loading favorites:", err);
      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (id, propertyName) => {
    const favIds = JSON.parse(localStorage.getItem("homenest_favorites")) || [];
    const updated = favIds.filter(favId => favId !== id);
    localStorage.setItem("homenest_favorites", JSON.stringify(updated));
    setFavorites(prev => prev.filter(p => p._id !== id));
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

  // Check if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border border-base-200 max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-3xl text-error" />
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">Login Required</h3>
          <p className="text-base-content/70 mb-6">
            Please log in to view your favorite properties
          </p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
              <FaHeart className="text-error" /> My Favorites
            </h1>
            <p className="text-base-content/70 mt-2">
              {favorites.length > 0 
                ? `You have ${favorites.length} saved ${favorites.length === 1 ? 'property' : 'properties'}`
                : "Your saved properties for later"
              }
            </p>
          </div>
          {favorites.length > 0 && (
            <button 
              onClick={clearAllFavorites}
              className="btn btn-outline btn-error btn-sm gap-2"
            >
              <FaTrash /> Clear All
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-primary mb-4" />
            <p className="text-base-content/70">Loading your favorites...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-base-100 rounded-xl border border-error/20 max-w-2xl mx-auto">
            <div className="text-5xl mb-4 text-error">⚠️</div>
            <h3 className="text-xl font-semibold text-error mb-2">Error</h3>
            <p className="text-base-content/70 mb-6">{error}</p>
            <button 
              onClick={fetchFavorites}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-xl border-2 border-dashed border-base-300 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <FaHeart className="text-7xl text-error/20" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-3">
              No Favorites Yet
            </h3>
            <p className="text-base-content/70 mb-8 max-w-md mx-auto">
              Start exploring and save properties you love by clicking the heart icon!
            </p>
            <Link to="/properties" className="btn btn-primary gap-2">
              <FaMapMarkerAlt /> Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <FavoritePropertyCard
                key={property._id}
                property={property}
                onRemove={removeFromFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ Separate component for favorite property cards
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
  } = property;

  const displayImage = imageURLs?.[0] || imageURL || "https://placehold.co/400x300?text=Property";
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
      {/* Image Section */}
      <figure className="relative aspect-video overflow-hidden">
        <Link to={`/property/${_id}`}>
          <img
            src={displayImage}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x300?text=Property";
            }}
          />
        </Link>
        
        {/* Remove Button - Top Right */}
        <button
          onClick={() => onRemove(_id, name)}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-base-100/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 hover:bg-error group/btn"
          aria-label="Remove from favorites"
          title="Remove from favorites"
        >
          <FaHeart className="text-error w-5 h-5 group-hover/btn:text-base-100 transition-colors" />
        </button>

        {/* Category Badge - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`badge ${getCategoryColor(category)} badge-lg font-semibold`}>
            {category}
          </span>
        </div>

        {/* Price Tag - Bottom Left */}
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

      {/* Card Body */}
      <div className="card-body p-5">
        <Link to={`/property/${_id}`}>
          <h2 className="card-title text-lg hover:text-primary transition-colors line-clamp-2">
            {name}
          </h2>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-2 text-base-content/70 text-sm mb-2">
          <FaMapMarkerAlt className="text-error flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Description */}
        <p className="text-base-content/70 text-sm line-clamp-2 mb-3">
          {description}
        </p>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <FaStar className="text-warning" />
            <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            <span className="text-xs text-base-content/60">rating</span>
          </div>
        )}

        {/* Actions */}
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

export default Favorites;