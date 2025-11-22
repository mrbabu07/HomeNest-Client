import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner, FaStar } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const [propRes, revRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/properties/${id}`),
          axios.get(`${API_BASE_URL}/api/reviews/property/${id}`)
        ]);
        setProperty(propRes.data);
        setReviews(revRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to review.");
    
    setReviewLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const reviewData = {
        propertyId: id,
        reviewerName: user.displayName || user.email,
        reviewerEmail: user.email,
        rating: Number(newReview.rating),
        reviewText: newReview.reviewText
      };
      const newRev = await axios.post(`${API_BASE_URL}/api/reviews`, reviewData);
      setReviews([...reviews, newRev.data]);
      setNewReview({ rating: 5, reviewText: '' });
      toast.success('Review submitted!');
    } catch (err) {
      toast.error('Failed to submit review.');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">&larr; Go Back</button>
      <img src={property.imageURL} alt={property.name} className="w-full h-96 object-cover rounded mb-4" />
      <h1 className="text-3xl font-bold">{property.name}</h1>
      <p className="text-blue-600">{property.category}</p>
      <p className="mt-2">{property.description}</p>
      <p className="text-xl font-bold">৳{property.price.toLocaleString()}</p>
      <p>📍 {property.location}</p>
      <p className="text-gray-500">Posted by: {property.userName}</p>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
        {reviews.map(r => (
          <div key={r._id} className="border-b py-2">
            <p><strong>{r.reviewerName}</strong> - {r.rating} ★</p>
            <p>{r.reviewText}</p>
          </div>
        ))}

        {user && (
          <form onSubmit={handleSubmitReview} className="mt-4">
            <div className="mb-2">
              <label className="block mb-1">Your Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                className="border p-1"
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
              </select>
            </div>
            <textarea
              value={newReview.reviewText}
              onChange={(e) => setNewReview({...newReview, reviewText: e.target.value})}
              placeholder="Write your review..."
              required
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              disabled={reviewLoading}
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
            >
              {reviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;