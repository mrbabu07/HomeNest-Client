import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaSpinner,
  FaStar,
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaCalendar,
  FaArrowLeft,
} from "react-icons/fa";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-hot-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://home-nest-server-10.vercel.app/singleService/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        toast.error("Failed to load property");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Add review function
  const addReview = async () => {
    if (!user) {
      toast.error("Please login to add review");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setSubmitting(true);

    try {
      const newReview = {
        reviewerName: user.displayName || user.email,
        rating: rating,
        reviewText: reviewText,
        userEmail: user.email,
      };

      const response = await axios.post(
        `https://home-nest-server-10.vercel.app/singleService/${id}/reviews`,
        newReview
      );

      // Update property with new review
      setProperty((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), response.data.review],
      }));

      setReviewText("");
      setRating(5);
      toast.success("Review added successfully!");
    } catch (error) {
      toast.error("Failed to add review");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  // Show error if no property
  if (!property) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg">Property not found</p>
        <button
          onClick={() => navigate("/properties")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      {/* Property image */}
      <img
        src={
          property.image ||
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=400&fit=crop"
        }
        alt={property.propertyName}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Property details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {property.propertyName}
        </h1>

        <div className="flex items-center gap-2 text-blue-600 mb-3">
          <FaTag />
          <span className="font-medium">{property.category}</span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {property.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{property.location}</span>
          </div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ${property.price?.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <FaUser />
          <span>Posted by {property.userName}</span>
          <FaCalendar />
          <span>{new Date(property.postedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Reviews section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Reviews ({property.reviews?.length || 0})
        </h2>

        {/* Reviews list */}
        {property.reviews?.length > 0 ? (
          <div className="space-y-4 mb-6">
            {property.reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {review.reviewerName}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {review.reviewText}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            No reviews yet
          </p>
        )}

        {/* Add review form */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add Your Review
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={addReview}
              disabled={submitting || !user}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            {!user && (
              <p className="text-sm text-gray-500">
                Please login to add a review
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
