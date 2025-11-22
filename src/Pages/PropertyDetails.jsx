// Pages/PropertyDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyById, fetchReviewsForProperty, createReview } from '../services/api'; // আপনার API সার্ভিস পাথ ম্যাচ করুন
import { FaSpinner, FaStar } from 'react-icons/fa'; // লোডিং স্পিনার ও স্টার আইকনের জন্য
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // আপনার কনটেক্সট পাথ ম্যাচ করুন
import { toast } from 'react-toastify'; // ধরে নিচ্ছি আপনি react-toastify ব্যবহার করছেন

const PropertyDetails = () => {
  const { id } = useParams(); // URL থেকে প্রোপার্টির ID নেওয়া
  const { user } = useContext(AuthContext); // AuthContext থেকে ইউজার নিন
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' }); // ডিফল্ট রেটিং 5
  const navigate = useNavigate();

  useEffect(() => {
    const getPropertyDetails = async () => {
      try {
        setLoading(true);
        const [propertyData, reviewsData] = await Promise.all([
          fetchPropertyById(id),
          fetchReviewsForProperty(id) // এই প্রোপার্টির রিভিউ ফেচ করুন
        ]);
        setProperty(propertyData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching property details or reviews:", err);
        setError('Failed to load property details or reviews.');
      } finally {
        setLoading(false);
      }
    };

    getPropertyDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    setReviewLoading(true);

    try {
      const reviewData = {
        propertyId: id,
        reviewerName: user.displayName || user.email,
        reviewerEmail: user.email,
        rating: parseInt(newReview.rating), // নাম্বার হিসেবে পাঠানো
        reviewText: newReview.reviewText
      };

      const createdReview = await createReview(reviewData); // API কল
      setReviews([...reviews, createdReview]); // নতুন রিভিউ UI তে যোগ করুন
      setNewReview({ rating: 5, reviewText: '' }); // ফর্ম রিসেট করুন
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleRatingChange = (e) => {
    setNewReview({ ...newReview, rating: parseInt(e.target.value) });
  };

  const handleReviewTextChange = (e) => {
    setNewReview({ ...newReview, reviewText: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error || !property) {
    return <div className="text-center text-red-500 p-4">{error || "Property not found!"}</div>;
  }

  return (
    <div className="property-details-page p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        {/* <ArrowLeft size={16} className="mr-1" /> */} {/* যদি lucide-react ব্যবহার করেন */}
        &larr; Go Back
      </button>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={property.imageURL} alt={property.name} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800">{property.name}</h2>
          <p className="text-blue-600 font-medium text-lg mt-1">{property.category}</p>
          <p className="text-gray-600 mt-3">{property.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p className="text-gray-800 font-bold text-xl">💰 ${property.price}</p>
            <p className="text-gray-600">📍 {property.location}</p>
            <p className="text-sm text-gray-500">📅 Posted on: {new Date(property.dateAdded).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">👤 Posted by: {property.userName} ({property.userEmail})</p>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Ratings & Reviews</h3>

        {/* Review Form (শুধুমাত্র লগইন করা ইউজারের জন্য) */}
        {user ? (
          <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">Leave a Review</h4>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={newReview.rating}
                onChange={handleRatingChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea
                id="reviewText"
                value={newReview.reviewText}
                onChange={handleReviewTextChange}
                rows="3"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={reviewLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-6">Please <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">log in</button> to leave a review.</p>
        )}

        {/* Reviews List */}
        <div>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet for this property.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-gray-800">{review.reviewerName}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">{review.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Date: {new Date(review.dateAdded).toLocaleDateString()}</p>
                  <p className="mt-2 text-gray-700">{review.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;