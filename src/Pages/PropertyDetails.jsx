import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSpinner, FaStar } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { toast } from 'react-toastify';

const dummyDetails = {
  '1': {
    _id: '1',
    name: 'Cozy Apartment',
    category: 'Apartment',
    description: 'A nice cozy apartment in the city.',
    price: 2500000,
    location: 'Dhaka',
    userName: 'Ali',
    userEmail: 'ali@example.com',
    postedDate: '2025-11-22',
    imageURL: 'https://via.placeholder.com/400x300',
    reviews: [
      { _id: 'r1', reviewerName: 'John', rating: 5, reviewText: 'Great place!' }
    ]
  },
  '2': {
    _id: '2',
    name: 'Luxury Villa',
    category: 'Villa',
    description: 'A beautiful villa with garden.',
    price: 10000000,
    location: 'Chittagong',
    userName: 'Fatema',
    userEmail: 'fatema@example.com',
    postedDate: '2025-11-20',
    imageURL: 'https://via.placeholder.com/400x300',
    reviews: []
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/singleService/${id}`)
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property details:', err);
        // fallback to dummy data
        setProperty(dummyDetails[id] || null);
        setLoading(false);
      });
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to submit a review.");
    setReviewLoading(true);

    const newReview = {
      _id: Date.now().toString(),
      reviewerName: user.displayName || user.email,
      rating,
      reviewText
    };

    // In real app, send POST request to backend
    setProperty(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview]
    }));
    setReviewText('');
    setRating(5);
    setReviewLoading(false);
    toast.success("Review submitted!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (!property) {
    return <p className="text-center mt-10">Property not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">
        &larr; Go Back
      </button>

      <img
        src={property.imageURL}
        alt={property.name}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold">{property.name}</h1>
      <p className="text-blue-600">{property.category}</p>
      <p className="mt-2">{property.description}</p>
      <p className="text-xl font-bold mt-2">৳{property.price?.toLocaleString()}</p>
      <p>📍 {property.location}</p>
      <p>Posted on: {property.postedDate}</p>
      <p className="text-gray-500">Posted by: {property.userName} ({property.userEmail})</p>

      {/* Ratings & Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ratings & Reviews</h3>
        {(property.reviews?.length ?? 0) > 0 ? (
          property.reviews.map(r => (
            <div key={r._id} className="border-b py-2">
              <p>
                <strong>{r.reviewerName}</strong> - {r.rating} <FaStar className="inline text-yellow-500" />
              </p>
              <p>{r.reviewText}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        {user && (
          <form onSubmit={handleSubmitReview} className="mt-4">
            <div className="mb-2">
              <label className="block mb-1">Your Rating</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className="border p-1"
              >
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
              </select>
            </div>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
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
