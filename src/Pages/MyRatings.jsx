// Pages/MyRatings.jsx
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // আপনার কনটেক্সট পাথ ম্যাচ করুন
import { fetchReviewsByReviewer } from '../services/api'; // আপনার API সার্ভিস পাথ ম্যাচ করুন
import { FaSpinner, FaStar } from 'react-icons/fa'; // লোডিং স্পিনার ও স্টার আইকনের জন্য

const MyRatings = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // AuthContext থেকে ইউজার নিন
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return; // Auth loading চলছে তাহলে আর কিছু করবে না

    if (!user) {
      // লগইন না করলে প্রাইভেট রুট এর মতো কাজ করবে (App.js এর PrivateRoute এর মাধ্যমে হওয়া উচিত, তবু এখানেও চেক করা যেতে পারে)
      // navigate('/login'); // App.js এর PrivateRoute এ আছে, তাই এখানে নেভিগেট করার দরকার নেই
      return;
    }

    const getMyReviews = async () => {
      try {
        setLoading(true);
        // সার্ভারে এমন একটা API হতে হবে যেখানে reviewerEmail দিলে সেই ইউজারের দেওয়া রিভিউ পাওয়া যাবে
        const data = await fetchReviewsByReviewer(user.email);
        setReviews(data);
      } catch (err) {
        console.error("Error fetching my ratings:", err);
        setError('Failed to load your ratings.');
      } finally {
        setLoading(false);
      }
    };

    getMyReviews();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="my-ratings-page p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Ratings & Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You haven't rated any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map(review => (
            <div key={review._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              {/* এখানে প্রোপার্টির ছবি থাকলে ভালো হয়, সার্ভারে রিভিউতে propertyId থাকবে, সেটা দিয়ে প্রোপার্টির ছবি নাম আনতে হবে। এখন ডামি ছবি। */}
              {/* <img src={review.propertyImageURL || "https://via.placeholder.com/100"} alt={review.propertyName} className="w-16 h-16 object-cover rounded-md mb-2" /> */}
              <h3 className="text-lg font-semibold text-gray-800 truncate">Property: {review.propertyName || "N/A"}</h3>
              <p className="text-sm text-gray-600">By: {review.reviewerName}</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.reviewText}</p>
              <p className="text-xs text-gray-500 mt-2">Date: {new Date(review.dateAdded).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRatings;