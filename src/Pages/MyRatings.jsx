import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { FaSpinner, FaStar } from "react-icons/fa";

const MyRatings = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/reviewsByUser/${user.email}`)
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl" />
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Ratings & Reviews</h2>

      {reviews.length === 0 ? (
        <p>You haven't rated anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, index) => (
            <div key={index} className="border shadow rounded p-4">
              <img
                src={r.propertyImageURL}
                alt=""
                className="w-full h-44 object-cover rounded"
              />
              <h3 className="font-bold mt-2">{r.propertyName}</h3>

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
