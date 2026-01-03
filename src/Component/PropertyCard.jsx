// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaMapMarkerAlt,
//   FaTag,
//   FaUser,
//   FaCalendar,
//   FaStar,
//   FaHeart,
//   FaRegHeart,
// } from "react-icons/fa";

// const PropertyCard = ({ property }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   //Map API fields to your variable names
//   const {
//     _id,
//     name: propertyName,
//     category,
//     description,
//     location,
//     price,
//     imageURL: image,
//     userName,
//     postedDate,
//   } = property;

//   const formattedPrice = new Intl.NumberFormat("en-US").format(price);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently added";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return "Recently added";

//       const now = new Date();
//       const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));

//       // if (diffDays === 1) return "1 day ago";
//       // if (diffDays < 7) return `${diffDays} days ago`;
//       // if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return "Recently added";
//     }
//   };

//   const getCategoryInfo = (cat) => {
//     const categories = {
//       rent: { colorClass: "bg-blue-600", text: "For Rent", icon: "🏠" },
//       sale: { colorClass: "bg-blue-800", text: "For Sale", icon: "💰" },
//       commercial: { colorClass: "bg-gray-700", text: "Commercial", icon: "🏢" },
//       land: { colorClass: "bg-gray-600", text: "Land", icon: "🌳" },
//     };
//     return (
//       categories[cat?.toLowerCase()] || {
//         colorClass: "bg-gray-500",
//         text: "Property",
//         icon: "🏡",
//       }
//     );
//   };

//   const categoryInfo = getCategoryInfo(category);

//   const toggleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);
//   };

//   return (
//     <div className="group bg-base-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 str border-base-200 transform hover:scale-105 hover:-translate-y-2">
//       {/* Image Section */}
//       <div className="relative h-64 overflow-hidden">
//         {!imageLoaded && (
//           <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
//             <span className="text-base-content/70 text-sm">
//               Loading image...
//             </span>
//           </div>
//         )}

//         <img
//           src={
//             image ||
//             "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=400&fit=crop"
//           }
//           alt={propertyName || "Property"} // ✅ fallback added
//           className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
//             imageLoaded ? "opacity-100" : "opacity-0"
//           }`}
//           onLoad={() => setImageLoaded(true)}
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//         {/* Category Badge */}
//         <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
//           <div
//             className={`${categoryInfo.colorClass} text-base-100 px-4 py-2 rounded-2xl shadow-2xl font-bold text-sm uppercase tracking-wider flex items-center space-x-2`}
//           >
//             <span>{categoryInfo.icon}</span>
//             <span>{categoryInfo.text}</span>
//           </div>
//         </div>

//         {/* Like Button */}
//         <button
//           onClick={toggleLike}
//           className="absolute top-4 right-4 w-10 h-10 bg-base-100/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300"
//         >
//           {isLiked ? (
//             <FaHeart className="text-error w-5 h-5" />
//           ) : (
//             <FaRegHeart className="text-base-content/60 w-5 h-5 hover:text-error transition-colors" />
//           )}
//         </button>

//         {/* Price Tag */}
//         <div className="absolute bottom-4 left-4">
//           <div className="bg-base-100/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-2xl border border-base-100/20">
//             <div className="flex items-center space-x-2">
//               <FaTag className="w-4 h-4 text-primary" />
//               <span className="text-xl font-bold text-base-content">
//                 ${formattedPrice}
//               </span>
//               {category?.toLowerCase() === "rent" && (
//                 <span className="text-sm text-base-content/70">/month</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Property Details */}
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <h3 className="text-xl font-bold text-base-content line-clamp-1 group-hover:text-primary transition-colors duration-300 flex-1 pr-4">
//             {propertyName || "Modern Residence"} {/* ✅ Now shows real name */}
//           </h3>

//           <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-lg">
//             <FaStar className="w-4 h-4 text-warning" />
//             <span className="text-sm font-semibold text-base-content">4.8</span>
//           </div>
//         </div>

//         <div className="flex items-center text-base-content/70 mb-3">
//           <FaMapMarkerAlt className="w-4 h-4 mr-2 text-error" />
//           <span className="text-sm truncate">
//             {location || "Prime Downtown Location"}
//           </span>
//         </div>

//         <p className="text-base-content/70 text-sm mb-4 line-clamp-2 leading-relaxed">
//           {description ||
//             "Beautiful modern property with premium amenities and great views."}
//         </p>

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-base-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">
//               {userName?.charAt(0) || "O"}
//             </div>
//             <div>
//               <span className="text-xs font-semibold text-base-content">
//                 {userName || "Property Owner"}
//               </span>
//               <div className="flex items-center text-xs text-base-content/60">
//                 <FaCalendar className="w-3 h-3 mr-1" />
//                 <span>{formatDate(postedDate)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Link
//           to={`/property/${_id}`}
//           className="block w-full mt-4 bg-primary hover:bg-primary/90 text-primary-content text-center py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//         >
//           Explore Property
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PropertyCard;

// src/Component/PropertyCard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTag,
  FaCalendar,
  FaStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const PropertyCard = ({ property, showWishlist = true }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Destructure property fields
  const {
    _id,
    name: propertyName,
    category,
    description,
    location,
    price,
    imageURLs: image,
    ownerName,
    postedDate,
    rating = 4.5,
  } = property;

  // ✅ Check if property is in favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("homenest_favorites")) || [];
    setIsFavorited(favorites.includes(_id));
  }, [_id]);

  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryInfo = (cat) => {
    const categories = {
      rent: { colorClass: "bg-blue-600", text: "For Rent", icon: "🏠" },
      sale: { colorClass: "bg-blue-800", text: "For Sale", icon: "💰" },
      commercial: { colorClass: "bg-gray-700", text: "Commercial", icon: "🏢" },
      land: { colorClass: "bg-gray-600", text: "Land", icon: "🌳" },
    };
    return categories[cat?.toLowerCase()] || {
      colorClass: "bg-gray-500",
      text: "Property",
      icon: "🏡",
    };
  };

  const categoryInfo = getCategoryInfo(category);

  // ✅ Image Optimization Helper
  const getOptimizedImageUrl = (url, width = 400, height = 300) => {
    if (!url) return "https://placehold.co/600x400/ddd/999?text=Property+Image";
    
    // Check if URL supports query parameters (Cloudinary, Imgix, etc.)
    if (url.includes('cloudinary.com')) {
      // Cloudinary optimization
      return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,f_auto,q_auto/`);
    } else if (url.includes('imgix.net')) {
      // Imgix optimization
      return `${url}?w=${width}&h=${height}&fit=crop&auto=format,compress`;
    } else {
      // Generic query parameter approach (works with many CDNs)
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}w=${width}&h=${height}&fit=crop`;
    }
  };

  // ✅ Toggle favorite function
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("homenest_favorites")) || [];
    let updatedFavorites;

    if (isFavorited) {
      updatedFavorites = favorites.filter((id) => id !== _id);
      console.log("❌ Removed from favorites");
    } else {
      updatedFavorites = [...favorites, _id];
      console.log("✅ Added to favorites");
    }

    localStorage.setItem("homenest_favorites", JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="flex flex-col bg-base-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 hover:-translate-y-1 h-full group">
      
      {/* ========== IMAGE SECTION ========== */}
      <div className="relative h-60 overflow-hidden">
        
        {/* Loading Placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-base-200 animate-pulse flex items-center justify-center">
            <span className="text-base-content/70">Loading...</span>
          </div>
        )}

        {/* ✅ OPTIMIZED Property Image with lazy loading */}
        <img
          src={getOptimizedImageUrl(image, 400, 300)}
          alt={propertyName}
          loading="lazy" // ✅ Native lazy loading
          decoding="async" // ✅ Async image decoding for smoother rendering
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            e.target.src = "https://placehold.co/600x400/ddd/999?text=Property+Image";
          }}
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* ========== TOP LEFT: Category Badge ========== */}
        <div className="absolute top-3 left-3 z-10">
          <div
            className={`${categoryInfo.colorClass} text-base-100 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-lg`}
          >
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.text}</span>
          </div>
        </div>

        {/* ========== TOP RIGHT: Wishlist/Favorite Button ========== */}
        {showWishlist && (
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-10 w-10 h-10 bg-base-100/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? (
              <FaHeart className="text-error w-5 h-5 animate-pulse" />
            ) : (
              <FaRegHeart className="text-base-content/70 w-5 h-5 hover:text-error transition-colors" />
            )}
          </button>
        )}

        {/* ========== BOTTOM LEFT: Price Tag ========== */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-base-100/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center space-x-1.5">
              <FaTag className="w-4 h-4 text-primary" />
              <span className="font-bold text-base-content text-lg">
                ${formattedPrice}
              </span>
              {category?.toLowerCase() === "rent" && (
                <span className="text-xs text-base-content/70 font-medium">/month</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========== PROPERTY DETAILS SECTION ========== */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title & Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-base-content line-clamp-1 hover:text-primary transition-colors flex-1 pr-2">
            {propertyName}
          </h3>
          <div className="flex items-center space-x-1 bg-warning/10 px-2 py-1 rounded-lg">
            <FaStar className="w-3.5 h-3.5 text-warning" />
            <span className="text-xs font-semibold text-base-content">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-base-content/80 mb-3">
          <FaMapMarkerAlt className="w-3.5 h-3.5 mr-1.5 text-error flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>

        {/* Description */}
        <p className="text-base-content/80 text-sm mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Owner & Date */}
        <div className="flex items-center space-x-2 pt-3 border-t border-base-200 mb-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content text-sm font-bold shadow-sm">
            {ownerName?.charAt(0)?.toUpperCase() || "O"}
          </div>
          <div className="text-xs flex-1">
            <div className="font-semibold text-base-content">{ownerName}</div>
            <div className="flex items-center text-base-content/70 mt-0.5">
              <FaCalendar className="w-3 h-3 mr-1" />
              <span>{formatDate(postedDate)}</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/property/${_id}`}
          className="w-full bg-primary text-primary-content text-center py-3 rounded-xl font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;