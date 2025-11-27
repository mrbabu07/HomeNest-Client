// src/Component/PropertyCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaTag, 
  FaUser, 
  FaCalendar, 
  FaStar, 
  FaBed, 
  FaBath, 
  FaRulerCombined,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    _id,
    propertyName,
    category,
    description,
    location,
    price,
    image,
    userName,
    postedDate,
    bedrooms = 3,
    bathrooms = 2,
    area = 1800
  } = property;

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);
  
  // Format date properly - FIXED
  const formatDate = (dateString) => {
    if (!dateString) return "Recently added";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Recently added";
      }
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Recently added";
    }
  };

  // Get category color and icon
  const getCategoryInfo = (cat) => {
    const categories = {
      rent: { 
        color: "from-green-500 to-emerald-600",
        text: "For Rent", 
        icon: "🏠"
      },
      sale: { 
        color: "from-blue-500 to-cyan-600",
        text: "For Sale", 
        icon: "💰"
      },
      commercial: { 
        color: "from-purple-500 to-indigo-600",
        text: "Commercial", 
        icon: "🏢"
      },
      land: { 
        color: "from-orange-500 to-red-500",
        text: "Land", 
        icon: "🌳"
      }
    };
    return categories[cat?.toLowerCase()] || { 
      color: "from-gray-500 to-gray-600",
      text: "Property", 
      icon: "🏡"
    };
  };

  const categoryInfo = getCategoryInfo(category);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/30 hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 transform hover:scale-105 hover:-translate-y-2">
      
      {/* Property Image Section */}
      <div className="relative h-64 overflow-hidden">
        {/* Image Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 text-sm">Loading image...</div>
          </div>
        )}
        
        <img
          src={image || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop"}
          alt={propertyName}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Category Badge with Gradient */}
        <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
          <div className={`bg-gradient-to-r ${categoryInfo.color} text-white px-4 py-2 rounded-2xl shadow-2xl font-bold text-sm uppercase tracking-wider flex items-center space-x-2`}>
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.text}</span>
          </div>
        </div>
        
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 group/like"
        >
          {isLiked ? (
            <FaHeart className="text-red-500 w-5 h-5 transform scale-110" />
          ) : (
            <FaRegHeart className="text-gray-600 dark:text-gray-400 w-5 h-5 group-hover/like:text-red-400 transition-colors" />
          )}
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <FaTag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">${formattedPrice}</span>
              {category?.toLowerCase() === 'rent' && (
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats - Appear on Hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FaBed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">{bedrooms}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FaBath className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="font-semibold">{bathrooms}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <FaRulerCombined className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-semibold">{area} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Property Title and Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex-1 pr-4">
            {propertyName || "Luxury Modern Residence"}
          </h3>
          <div className="flex items-center space-x-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
            <FaStar className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">4.8</span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
          <span className="text-sm truncate">{location || "Prime Downtown Location"}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description || "Beautiful modern property with stunning views and premium amenities in the heart of the city."}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-2 border border-gray-200 dark:border-gray-600">
            <FaBed className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300">{bedrooms} Beds</span>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-2 border border-gray-200 dark:border-gray-600">
            <FaBath className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300">{bathrooms} Baths</span>
          </div>
          <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-2 border border-gray-200 dark:border-gray-600">
            <FaRulerCombined className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <span className="text-xs text-gray-700 dark:text-gray-300">{area} sqft</span>
          </div>
        </div>

        {/* Footer Info with Date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {userName?.charAt(0) || "O"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {userName || "Property Owner"}
                </span>
                {/* DATE DISPLAY - FIXED */}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <FaCalendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(postedDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/property/${_id}`}
          className="block w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-500/20 dark:border-purple-500/20"
        >
          Explore Property
        </Link>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default PropertyCard;