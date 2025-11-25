import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { FaSpinner, FaStar } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/reviewsByUser/${user.email}`)
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("Failed to load reviews:", err);
        // Optionally show error toast
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Ratings & Reviews</h2>

      {reviews.length === 0 ? (
        <p>You haven't rated anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <div key={r._id?.toString() || r.dateAdded} className="border shadow rounded p-4">
              <img
                src={r.propertyImageURL}
                alt={r.propertyName}
                className="w-full h-44 object-cover rounded mb-2"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x150?text=No+Image";
                }}
              />
              <h3 className="font-bold">{r.propertyName}</h3>

              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < r.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="mt-2">{r.reviewText}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(r.dateAdded).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;