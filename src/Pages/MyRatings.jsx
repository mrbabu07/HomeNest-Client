// src/Pages/MyRatings.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { FaStar, FaComments, FaQuoteLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/reviewsByUser/${user.email}`);
        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        toast.error("Could not load your reviews.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-primary">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStar className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Login Required</h2>
          <p className="text-neutral">Please log in to view your ratings and reviews.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-4">
            <FaStar className="text-xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary">My Ratings & Reviews</h1>
          <p className="text-neutral mt-2">Your feedback and experiences with properties</p>
        </div>

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-xl border max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaComments className="text-3xl text-neutral/50" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">No Reviews Yet</h3>
            <p className="text-neutral max-w-md mx-auto">
              You haven't rated any properties yet. Start exploring and share your experiences!
            </p>
          </div>
        ) : (
          <div>
            {/* Review Count */}
            <div className="mb-6 p-3 bg-base-200 inline-block rounded-lg">
              <p className="text-sm text-neutral">
                Total Reviews:{" "}
                <span className="font-bold text-primary">{reviews.length}</span>
              </p>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div
                  key={review._id?.toString() || index}
                  className="bg-base-100 border rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Property Image */}
                    <div className="md:w-2/5 h-56 md:h-auto relative">
                      <img
                        src={review.propertyImageURL || "https://via.placeholder.com/500x400?text=No+Image"}
                        alt={review.propertyName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/500x400?text=No+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <h3 className="text-lg font-bold text-white">{review.propertyName}</h3>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="md:w-3/5 p-5 flex flex-col justify-between">
                      {/* Rating & Quote */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < review.rating ? "text-yellow-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="font-bold text-primary ml-1">{review.rating}.0</span>
                        </div>
                        <FaQuoteLeft className="text-xl text-primary/20 mb-2" />
                        <p className="text-neutral italic">"{review.reviewText}"</p>
                      </div>

                      {/* Reviewer & Date */}
                      <div className="flex flex-col sm:flex-row justify-between pt-4 border-t border-base-content/10 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-primary">{review.reviewerName || "You"}</p>
                            <p className="text-xs text-neutral">Verified Reviewer</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-neutral">Reviewed on</p>
                          <p className="font-medium text-primary">
                            {new Date(review.dateAdded).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;