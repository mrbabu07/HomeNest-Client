// src/Pages/MyRatings.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FaStar,
  FaComments,
  FaQuoteLeft,
  FaSpinner,
  FaEye,
  FaCalendar,
  FaHome,
  FaChartLine,
  FaAward,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { TrendingUp, MessageSquare, Award } from "lucide-react";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/reviewsByUser/${user.email}`
      );
      const reviewsData = Array.isArray(res.data) ? res.data : [];
      setReviews(reviewsData);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      toast.error("Could not load your reviews.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    totalReviews: reviews.length,
    avgRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0,
    fiveStarReviews: reviews.filter((r) => r.rating === 5).length,
    recentReviews: reviews.filter(
      (r) => new Date(r.dateAdded) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      if (filterRating === "all") return true;
      return review.rating === parseInt(filterRating);
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (sortBy === "oldest") {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      } else if (sortBy === "highest") {
        return b.rating - a.rating;
      } else if (sortBy === "lowest") {
        return a.rating - b.rating;
      }
      return 0;
    });

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0
      ? ((reviews.filter((r) => r.rating === rating).length / reviews.length) * 100).toFixed(0)
      : 0,
  }));

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-primary mx-auto mb-4" />
          <p className="text-base-content/70">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow-lg border border-base-200 max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStar className="text-2xl text-primary-content" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-2">Login Required</h2>
          <p className="text-base-content/70 mb-6">
            Please log in to view your ratings and reviews.
          </p>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary p-3 rounded-lg">
              <FaStar className="text-2xl text-primary-content" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">My Ratings & Reviews</h1>
              <p className="text-base-content/70">Your feedback and experiences with properties</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Total Reviews */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <MessageSquare size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.totalReviews}</div>
              <div className="text-sm opacity-90">Total Reviews</div>
            </div>

            {/* Average Rating */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <FaStar className="text-2xl" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.avgRating}</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>

            {/* 5-Star Reviews */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Award size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.fiveStarReviews}</div>
              <div className="text-sm opacity-90">5-Star Reviews</div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <TrendingUp size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stats.recentReviews}</div>
              <div className="text-sm opacity-90">Last 30 Days</div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-xl shadow-lg border border-base-200 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaComments className="text-3xl text-base-content/40" />
            </div>
            <h3 className="text-2xl font-semibold text-base-content mb-2">No Reviews Yet</h3>
            <p className="text-base-content/70 max-w-md mx-auto mb-6">
              You haven't rated any properties yet. Start exploring and share your experiences!
            </p>
            <Link to="/properties" className="btn btn-primary gap-2">
              <FaHome /> Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Rating Distribution */}
            <div className="lg:col-span-1">
              <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-base-content mb-6">Rating Distribution</h2>

                {/* Overall Rating */}
                <div className="text-center mb-6 pb-6 border-b border-base-200">
                  <div className="text-5xl font-bold text-primary mb-2">{stats.avgRating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < Math.round(stats.avgRating) ? "text-warning" : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-base-content/70">
                    Based on {stats.totalReviews} {stats.totalReviews === 1 ? "review" : "reviews"}
                  </p>
                </div>

                {/* Distribution Bars */}
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 min-w-[60px]">
                        <span className="text-sm font-medium text-base-content">{item.stars}</span>
                        <FaStar className="text-warning text-xs" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-base-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warning rounded-full transition-all"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-base-content/70 min-w-[50px] text-right">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="mt-6 pt-6 border-t border-base-200">
                  <h3 className="font-semibold text-base-content mb-3">Filter by Rating</h3>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="select select-bordered w-full mb-3"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  <h3 className="font-semibold text-base-content mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-base-200">
                  <h3 className="font-semibold text-base-content mb-3">Quick Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Properties Reviewed</span>
                      <span className="font-semibold text-base-content">{reviews.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Most Common Rating</span>
                      <span className="font-semibold text-base-content">
                        {ratingDistribution[0].stars} ⭐
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reviews List */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-base-content/70">
                  Showing {filteredReviews.length} of {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>

              <div className="space-y-6">
                {filteredReviews.map((review, index) => (
                  <div
                    key={review._id?.toString() || index}
                    className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Property Image */}
                      <div className="md:w-2/5 h-56 md:h-auto relative group">
                        <img
                          src={
                            review.propertyImageURL ||
                            "https://placehold.co/500x400?text=Property"
                          }
                          alt={review.propertyName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/500x400?text=Property";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                            {review.propertyName}
                          </h3>
                          <Link
                            to={`/property/${review.propertyId}`}
                            className="text-xs text-white/90 hover:text-white flex items-center gap-1 w-fit"
                          >
                            <FaEye /> View Property
                          </Link>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="md:w-3/5 p-5 flex flex-col justify-between">
                        {/* Rating & Quote */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`text-lg ${
                                    i < review.rating ? "text-warning" : "text-base-300"
                                  }`}
                                />
                              ))}
                              <span className="font-bold text-primary ml-1">
                                {review.rating}.0
                              </span>
                            </div>
                            <span className="badge badge-primary badge-sm">
                              {review.rating >= 4 ? "Positive" : review.rating >= 3 ? "Neutral" : "Critical"}
                            </span>
                          </div>
                          <FaQuoteLeft className="text-xl text-primary/20 mb-2" />
                          <p className="text-base-content/80 leading-relaxed">
                            {review.reviewText}
                          </p>
                        </div>

                        {/* Reviewer & Date */}
                        <div className="flex flex-col sm:flex-row justify-between pt-4 mt-4 border-t border-base-200 gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content font-medium">
                              {review.reviewerName?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div>
                              <p className="font-medium text-base-content">
                                {review.reviewerName || "You"}
                              </p>
                              <p className="text-xs text-base-content/60 flex items-center gap-1">
                                <FaCalendar className="text-[10px]" />
                                {new Date(review.dateAdded).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              to={`/property/${review.propertyId}`}
                              className="btn btn-sm btn-ghost gap-1"
                              title="View Property"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredReviews.length === 0 && reviews.length > 0 && (
                <div className="text-center py-12 bg-base-100 rounded-xl border border-base-200">
                  <FaComments className="text-4xl text-base-content/30 mx-auto mb-3" />
                  <p className="text-base-content/70">No reviews match your filters</p>
                  <button
                    onClick={() => {
                      setFilterRating("all");
                      setSortBy("newest");
                    }}
                    className="btn btn-sm btn-ghost mt-3"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRatings;