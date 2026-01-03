// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   FaSpinner,
//   FaStar,
//   FaMapMarkerAlt,
//   FaTag,
//   FaUser,
//   FaCalendar,
//   FaArrowLeft,
// } from "react-icons/fa";
// import axios from "axios";
// import AuthContext from "../Context/AuthContext";
// import { toast } from "react-hot-toast";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [rating, setRating] = useState(5);
//   const [reviewText, setReviewText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   // Load property data
//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/singleService/${id}`
//         );
//         setProperty(response.data);
//       } catch (error) {
//         toast.error("Failed to load property");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperty();
//   }, [id]);

//   // Add review function
//   const addReview = async () => {
//     if (!user) {
//       toast.error("Please login to add review");
//       return;
//     }

//     if (!reviewText.trim()) {
//       toast.error("Please write a review");
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const newReview = {
//         reviewerName: user.displayName || user.email,
//         rating: rating,
//         reviewText: reviewText,
//         userEmail: user.email,
//       };

//       const response = await axios.post(
//         `http://localhost:3000/singleService/${id}/reviews`,
//         newReview
//       );

//       // Update property with new review
//       setProperty((prev) => ({
//         ...prev,
//         reviews: [...(prev.reviews || []), response.data.review],
//       }));

//       setReviewText("");
//       setRating(5);
//       toast.success("Review added successfully!");
//     } catch (error) {
//       toast.error("Failed to add review");
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Show loading
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <FaSpinner className="animate-spin text-4xl text-blue-600" />
//       </div>
//     );
//   }

//   // Show error if no property
//   if (!property) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-red-500 text-lg">Property not found</p>
//         <button
//           onClick={() => navigate("/properties")}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Back to Properties
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* Back button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-blue-600 mb-6"
//       >
//         <FaArrowLeft />
//         <span>Back</span>
//       </button>

//       {/* Property image */}
//       <img
//         src={
//           property.image ||
//           "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop"
//         }
//         alt={property.propertyName}
//         className="w-full h-64 object-cover rounded-lg mb-6"
//       />

//       {/* Property details */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           {property.propertyName}
//         </h1>

//         <div className="flex items-center gap-2 text-blue-600 mb-3">
//           <FaTag />
//           <span className="font-medium">{property.category}</span>
//         </div>

//         <p className="text-gray-700 dark:text-gray-300 mb-4">
//           {property.description}
//         </p>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//             <FaMapMarkerAlt className="text-red-500" />
//             <span>{property.location}</span>
//           </div>
//           <div className="text-xl font-bold text-gray-900 dark:text-white">
//             ${property.price?.toLocaleString()}
//           </div>
//         </div>

//         <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
//           <FaUser />
//           <span>Posted by {property.userName}</span>
//           <FaCalendar />
//           <span>{new Date(property.postedDate).toLocaleDateString()}</span>
//         </div>
//       </div>

//       {/* Reviews section */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//           Reviews ({property.reviews?.length || 0})
//         </h2>

//         {/* Reviews list */}
//         {property.reviews?.length > 0 ? (
//           <div className="space-y-4 mb-6">
//             {property.reviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="border-b border-gray-200 dark:border-gray-700 pb-4"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="font-medium text-gray-900 dark:text-white">
//                     {review.reviewerName}
//                   </span>
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar
//                         key={i}
//                         className={`w-4 h-4 ${
//                           i < review.rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   {review.reviewText}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 dark:text-gray-400 mb-6">
//             No reviews yet
//           </p>
//         )}

//         {/* Add review form */}
//         <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Add Your Review
//           </h3>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Rating
//               </label>
//               <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               >
//                 <option value={1}>1 Star</option>
//                 <option value={2}>2 Stars</option>
//                 <option value={3}>3 Stars</option>
//                 <option value={4}>4 Stars</option>
//                 <option value={5}>5 Stars</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Your Review
//               </label>
//               <textarea
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 placeholder="Write your review here..."
//                 rows="4"
//                 className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//             </div>

//             <button
//               onClick={addReview}
//               disabled={submitting || !user}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
//             >
//               {submitting ? "Submitting..." : "Submit Review"}
//             </button>

//             {!user && (
//               <p className="text-sm text-gray-500">
//                 Please login to add a review
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;

// src/Pages/PropertyDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaSpinner,
  FaStar,
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaCalendar,
  FaArrowLeft,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaShareAlt,
  FaHeart,
  FaRegHeart,
  FaExternalLinkAlt,
} from "react-icons/fa";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-hot-toast";

// ✅ Google Static Maps URL Generator
const getMapUrl = (address, width = 600, height = 300) => {
  if (!address) return "";
  const encodedAddress = encodeURIComponent(address);
  return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=${width}&height=${height}&center=lonlat:90.4125,23.8103&zoom=13&marker=lonlat:90.4125,23.8103;type:awesome;color:%23ff0000;size:large&apiKey=YOUR_API_KEY`;
};

// Separate PropertyCard component for similar properties
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${property._id}`)}
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <figure className="aspect-video overflow-hidden">
        <img
          src={
            property.imageURL ||
            property.imageURLs?.[0] ||
            "https://placehold.co/400x300?text=Property"
          }
          alt={property.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base">{property.name}</h3>
        <p className="text-sm text-base-content/70 flex items-center gap-1">
          <FaMapMarkerAlt className="text-error" />
          {property.location}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold text-success">
            ${property.price?.toLocaleString()}
          </span>
          <span className="badge badge-primary badge-sm">
            {property.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch property details
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/singleService/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        toast.error("Failed to load property");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  // Check if property is in favorites
  useEffect(() => {
    if (user && id) {
      const favorites =
        JSON.parse(localStorage.getItem("homenest_favorites")) || [];
      setIsFavorite(favorites.includes(id));
    }
  }, [user, id]);

  // Fetch similar properties
  useEffect(() => {
    if (property?.category) {
      axios
        .get(
          `http://localhost:3000/allServices?category=${property.category}&limit=4`
        )
        .then((res) => {
          const others = res.data.properties.filter((p) => p._id !== id);
          setSimilarProperties(others.slice(0, 3));
        })
        .catch((err) =>
          console.error("Failed to fetch similar properties:", err)
        );
    }
  }, [id, property]);

  // ✅ Send notification function
  const sendNotification = async (to, message, type = "info") => {
    try {
      await axios.post("http://localhost:3000/api/notify", {
        to,
        message,
        type,
        propertyId: id,
      });
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  // ✅ Add review handler with notification
  const addReview = async () => {
    if (!user) {
      toast.error("Please login to add a review");
      navigate("/login");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setSubmitting(true);
    try {
      const newReview = {
        reviewerName: user.displayName || user.email.split("@")[0],
        rating,
        reviewText,
        userEmail: user.email,
      };

      const response = await axios.post(
        `http://localhost:3000/singleService/${id}/reviews`,
        newReview
      );

      setProperty((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), response.data.review],
      }));

      setReviewText("");
      setRating(5);
      toast.success("Review added successfully!");

      // ✅ Send notification to property owner
      if (property.ownerEmail && property.ownerEmail !== user.email) {
        const stars = "⭐".repeat(rating);
        await sendNotification(
          property.ownerEmail,
          `${
            user.displayName || "Someone"
          } left a ${stars} (${rating}/5) review on your property "${
            property.name
          }"`,
          "review"
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add review");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.name,
          text: `Check out this property: ${property.name}`,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  // ✅ Toggle favorite with notification
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please login to save favorites");
      return;
    }

    const favorites =
      JSON.parse(localStorage.getItem("homenest_favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fid) => fid !== id);
      setIsFavorite(false);
      toast.success("Removed from favorites");
    } else {
      updatedFavorites = [...favorites, id];
      setIsFavorite(true);
      toast.success("Added to favorites");

      // ✅ Send notification to property owner
      if (property.ownerEmail && property.ownerEmail !== user.email) {
        await sendNotification(
          property.ownerEmail,
          `${user.displayName || "Someone"} added your property "${
            property.name
          }" to their favorites! ❤️`,
          "favorite"
        );
      }
    }

    localStorage.setItem(
      "homenest_favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // ✅ Contact owner handler with notification
  const handleContactOwner = async () => {
    if (!user) {
      toast.error("Please login to contact the owner");
      navigate("/login");
      return;
    }

    // Here you would typically open a contact form or chat
    toast.success("Contact form will open soon");

    // ✅ Send notification to property owner
    if (property.ownerEmail && property.ownerEmail !== user.email) {
      await sendNotification(
        property.ownerEmail,
        `${user.displayName || user.email} is interested in your property "${
          property.name
        }". They want to contact you!`,
        "inquiry"
      );
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="h-8 bg-base-200 rounded w-32 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-base-200 rounded-xl animate-pulse"></div>
          <div className="h-96 bg-base-200 rounded-xl animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-base-200 rounded w-2/3 animate-pulse"></div>
          <div className="h-4 bg-base-200 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-base-200 rounded w-5/6 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Property not found
  if (!property) {
    return (
      <div className="text-center py-16 bg-base-100">
        <p className="text-error text-lg font-medium">Property not found</p>
        <button
          onClick={() => navigate("/properties")}
          className="mt-4 btn btn-primary"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  // Extract property fields
  const {
    name,
    description,
    location,
    price,
    category,
    ownerName,
    ownerEmail,
    postedDate,
    reviews = [],
    bedrooms = "--",
    bathrooms = "--",
    area = "--",
    parking = false,
    amenities = [],
  } = property;

  // Support multiple images
  const images = Array.isArray(property.imageURLs)
    ? property.imageURLs
    : [property.imageURL || "https://placehold.co/800x400?text=Property+Image"];

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button & Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost gap-2 text-primary"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={toggleFavorite}
            className="btn btn-circle btn-ghost"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorite ? (
              <FaHeart className="text-error w-5 h-5 animate-pulse" />
            ) : (
              <FaRegHeart className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="btn btn-circle btn-ghost"
            aria-label="Share property"
          >
            <FaShareAlt className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Images */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-lg aspect-video bg-base-200">
            <img
              src={images[selectedImageIndex]}
              alt={`${name} - Image ${selectedImageIndex + 1}`}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-primary scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Key Info */}
        <div className="bg-base-100 rounded-xl p-6 shadow-md lg:sticky lg:top-24 h-fit">
          <h1 className="text-2xl font-bold text-base-content mb-2">{name}</h1>

          <div className="flex items-center gap-2 mb-3">
            <FaTag className="text-primary" />
            <span className="badge badge-primary">{category}</span>
            {reviews.length > 0 && (
              <div className="flex items-center gap-1 ml-2">
                <FaStar className="text-warning" />
                <span className="text-sm font-semibold">{avgRating}</span>
                <span className="text-xs text-base-content/60">
                  ({reviews.length})
                </span>
              </div>
            )}
          </div>

          <div className="text-3xl font-bold text-success mb-4">
            ${price?.toLocaleString()}
            {category?.toLowerCase() === "rent" && (
              <span className="text-base font-normal text-base-content/70">
                {" "}
                /month
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-base-content mb-4">
            <FaMapMarkerAlt className="text-error" />
            <span>{location}</span>
          </div>

          {/* Key Specs Section */}
          <div className="divider mt-2 mb-4">Details</div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2">
              <FaBed className="text-primary" />
              <span>{bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-primary" />
              <span>{bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRulerCombined className="text-primary" />
              <span>{area} sqft</span>
            </div>
            {parking && (
              <div className="flex items-center gap-2">
                <FaParking className="text-primary" />
                <span>Parking</span>
              </div>
            )}
          </div>

          <div className="divider mb-4"></div>

          <div className="flex items-center gap-3 text-sm text-base-content/80">
            <FaUser />
            <span className="font-medium">{ownerName || "Owner"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-base-content/80 mt-2">
            <FaCalendar />
            <span>Posted {new Date(postedDate).toLocaleDateString()}</span>
          </div>

          {/* ✅ Contact Owner Button with Notification */}
          <button
            onClick={handleContactOwner}
            className="btn btn-primary w-full mt-6"
            disabled={user?.email === ownerEmail}
          >
            {user?.email === ownerEmail ? "Your Property" : "Contact Owner"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-base-100 rounded-xl p-6 shadow-md my-8">
        <h2 className="text-xl font-bold text-base-content mb-4">
          Description
        </h2>
        <p className="text-base-content/80 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div className="bg-base-100 rounded-xl p-6 shadow-md my-8">
          <h2 className="text-xl font-bold text-base-content mb-4">
            Amenities
          </h2>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, i) => (
              <span key={i} className="badge badge-outline badge-lg">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Location Map Section */}
      {location && (
        <div className="bg-base-100 rounded-xl p-6 shadow-md my-8">
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-error text-xl" />
            <h2 className="text-xl font-bold text-base-content">Location</h2>
          </div>

          <div className="mb-4">
            <p className="text-base-content/80 font-medium text-lg">
              {location}
            </p>
          </div>

          {/* Interactive Map Link */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative rounded-xl overflow-hidden border-2 border-base-200 hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <img
              src={getMapUrl(location, 800, 400)}
              srcSet={`
                ${getMapUrl(location, 400, 200)} 400w,
                ${getMapUrl(location, 800, 400)} 800w,
                ${getMapUrl(location, 1200, 600)} 1200w
              `}
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
              alt={`Map of ${location}`}
              loading="lazy"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/800x400/e5e7eb/6b7280?text=Click+to+View+on+Google+Maps";
              }}
            />

            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center">
              <div className="bg-primary text-primary-content px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2">
                <FaExternalLinkAlt />
                <span className="font-semibold">View on Google Maps</span>
              </div>
            </div>
          </a>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-primary flex-1 gap-2"
            >
              <FaMapMarkerAlt />
              Open in Google Maps
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-secondary flex-1 gap-2"
            >
              <FaExternalLinkAlt />
              Get Directions
            </a>
          </div>
        </div>
      )}

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="my-12">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Similar Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <div className="bg-base-100 rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-base-content">
            Reviews ({reviews.length})
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <FaStar className="text-warning" />
              <span className="font-semibold">{avgRating}</span>
              <span className="text-sm text-base-content/60">average</span>
            </div>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-6 mb-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-l-4 border-primary pl-4 py-2 bg-base-200/30 rounded-r-lg pr-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base-content">
                      {review.reviewerName}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-warning"
                              : "text-base-content/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-base-content/60">
                    {new Date(review.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-base-content/80">{review.reviewText}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base-content/60 mb-6 text-center py-8">
            No reviews yet. Be the first to review this property!
          </p>
        )}

        {/* Add Review Form */}
        <div className="border-t border-base-200 pt-6">
          <h3 className="text-lg font-semibold text-base-content mb-4">
            Add Your Review
          </h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="btn btn-circle btn-sm"
                  >
                    <FaStar
                      className={`w-5 h-5 ${
                        star <= rating ? "text-warning" : "text-base-content/30"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Your Review</span>
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this property..."
                rows="4"
                className="textarea textarea-bordered w-full"
                disabled={!user}
              />
            </div>

            <button
              onClick={addReview}
              disabled={submitting || !user || user?.email === ownerEmail}
              className="btn btn-primary w-full"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Submitting...
                </>
              ) : user?.email === ownerEmail ? (
                "Can't review your own property"
              ) : (
                "Submit Review"
              )}
            </button>

            {!user && (
              <p className="text-sm text-base-content/70 text-center">
                Please{" "}
                <Link to="/login" className="link link-primary font-semibold">
                  login
                </Link>{" "}
                to add a review
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
