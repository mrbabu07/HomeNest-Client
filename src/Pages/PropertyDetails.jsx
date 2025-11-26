// ✅ Import and config at the TOP
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSpinner, FaStar } from "react-icons/fa";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Component for displaying reviews
const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r._id} className="border rounded p-3 shadow-sm">
          <p className="font-semibold">
            {r.reviewerName} - {r.rating}{" "}
            <FaStar className="inline text-yellow-500" />
          </p>
          <p className="text-gray-700">{r.reviewText}</p>
        </div>
      ))}
    </div>
  );
};

// Component for submitting a new review
const ReviewForm = ({ onAddReview }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    setSubmitting(true);
    const newReview = {
      reviewerName: user.displayName || user.email,
      rating,
      reviewText,
    };

    onAddReview(newReview)
      .then(() => {
        setReviewText("");
        setRating(5);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div>
        <label className="block mb-1 font-medium">Your Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} Star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          required
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

// Main property details component
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ Now available

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch property
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_BASE_URL}/singleService/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => {
        console.error("Failed to fetch property:", err);
        setError("Property not found.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Submit review to backend
  const addReview = async (reviewInput) => {
    if (!user) return;

    const reviewPayload = {
      reviewerName: reviewInput.reviewerName,
      rating: reviewInput.rating,
      reviewText: reviewInput.reviewText,
      userEmail: user.email,
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/singleService/${id}/reviews`,
        reviewPayload
      );

      const newReview = res.data.review;
      setProperty((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview],
      }));

      toast.success("Review submitted!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!property) return <p className="text-center mt-10">Property not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-semibold hover:underline"
      >
        &larr; Go Back
      </button>

      <img
        src={property.imageURL}
        alt={property.name}
        className="w-full h-96 object-cover rounded shadow"
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-blue-600 font-medium">{property.category}</p>
        <p>{property.description}</p>
        <p className="text-xl font-bold">৳{property.price?.toLocaleString()}</p>
        <p>📍 {property.location}</p>
        <p className="text-gray-500">
          Posted on: {property.postedDate} by {property.userName} ({property.userEmail})
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Ratings & Reviews</h3>
        <Reviews reviews={property.reviews} />
        <ReviewForm onAddReview={addReview} />
      </div>
    </div>
  );
};

export default PropertyDetails;