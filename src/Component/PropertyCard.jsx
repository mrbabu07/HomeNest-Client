// src/Component/PropertyCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaCalendar,
  FaStar,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ FIXED: Map API fields to your variable names
  const {
    _id,
    name: propertyName,        // ← from "name" in DB
    category,
    description,
    location,
    price,
    imageURL: image,           // ← from "imageURL" in DB
    userName,
    postedDate
  } = property;

  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently added";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently added";

      const now = new Date();
      const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "Recently added";
    }
  };

  const getCategoryInfo = (cat) => {
    const categories = {
      rent: { colorClass: "bg-blue-600", text: "For Rent", icon: "🏠" },
      sale: { colorClass: "bg-blue-800", text: "For Sale", icon: "💰" },
      commercial: { colorClass: "bg-gray-700", text: "Commercial", icon: "🏢" },
      land: { colorClass: "bg-gray-600", text: "Land", icon: "🌳" }
    };
    return (
      categories[cat?.toLowerCase()] || {
        colorClass: "bg-gray-500",
        text: "Property",
        icon: "🏡"
      }
    );
  };

  const categoryInfo = getCategoryInfo(category);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-base-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 stroke-3 border-base-200 transform hover:scale-105 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
            <span className="text-base-content/70 text-sm">Loading image...</span>
          </div>
        )}

        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop"
          }
          alt={propertyName || "Property"} // ✅ fallback added
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
          <div
            className={`${categoryInfo.colorClass} text-base-100 px-4 py-2 rounded-2xl shadow-2xl font-bold text-sm uppercase tracking-wider flex items-center space-x-2`}
          >
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.text}</span>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-base-100/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300"
        >
          {isLiked ? (
            <FaHeart className="text-error w-5 h-5" />
          ) : (
            <FaRegHeart className="text-base-content/60 w-5 h-5 hover:text-error transition-colors" />
          )}
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-base-100/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border border-base-100/20">
            <div className="flex items-center space-x-2">
              <FaTag className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold text-base-content">
                ${formattedPrice}
              </span>
              {category?.toLowerCase() === "rent" && (
                <span className="text-sm text-base-content/70">/month</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors duration-300 flex-1 pr-4">
            {propertyName || "Modern Residence"} {/* ✅ Now shows real name */}
          </h3>

          <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-lg">
            <FaStar className="w-4 h-4 text-warning" />
            <span className="text-sm font-semibold text-base-content">4.8</span>
          </div>
        </div>

        <div className="flex items-center text-base-content/70 mb-3">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-error" />
          <span className="text-sm truncate">
            {location || "Prime Downtown Location"}
          </span>
        </div>

        <p className="text-base-content/70 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description ||
            "Beautiful modern property with premium amenities and great views."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-base-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">
              {userName?.charAt(0) || "O"}
            </div>
            <div>
              <span className="text-xs font-semibold text-base-content">
                {userName || "Property Owner"}
              </span>
              <div className="flex items-center text-xs text-base-content/60">
                <FaCalendar className="w-3 h-3 mr-1" />
                <span>{formatDate(postedDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <Link
          to={`/property/${_id}`}
          className="block w-full mt-4 bg-primary hover:bg-primary/90 text-primary-content text-center py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Explore Property
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;