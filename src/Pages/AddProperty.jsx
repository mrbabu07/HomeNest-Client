import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaHome, FaMapMarkerAlt, FaDollarSign, FaImage, FaUser, FaEnvelope } from "react-icons/fa";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    imageURL: "",
  });

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to add a property.");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      userEmail: user.email,
      userName: user.displayName || user.email,
    };

    try {
      const res = await axios.post("http://localhost:3000/addService", payload);

      if (res.data.insertedId) {
        toast.success("Property added successfully!");
        setTimeout(() => navigate("/my-properties"), 1200);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  // Not logged in case
  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FaHome className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 transition-colors duration-500">
            Login Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
            You must log in first to add a property.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-10" data-aos="fade-down">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-lg mb-5 transition-all duration-500 hover:scale-110 hover:rotate-3">
            <FaHome className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-500">
            Add New Property
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 transition-colors duration-500">
            Share your property with thousands of potential buyers and renters
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-500" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Property Name */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                <FaHome className="text-blue-600 dark:text-blue-400" />
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 outline-none transition-all duration-300"
                placeholder="e.g., Modern Apartment in Gulshan"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 outline-none transition-all duration-300 resize-none"
                placeholder="Describe your property in detail..."
              ></textarea>
            </div>

            {/* Category and Price - Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category */}
              <div>
                <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer focus:border-indigo-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-300"
                >
                  <option value="Rent">🏠 Rent</option>
                  <option value="Sale">💰 Sale</option>
                  <option value="Commercial">🏢 Commercial</option>
                  <option value="Land">🌳 Land</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                  <FaDollarSign className="text-green-600 dark:text-green-400" />
                  Price (BDT) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/20 dark:focus:ring-green-400/20 outline-none transition-all duration-300"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                <FaMapMarkerAlt className="text-red-600 dark:text-red-400" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-4 focus:ring-red-500/20 dark:focus:ring-red-400/20 outline-none transition-all duration-300"
                placeholder="e.g., Gulshan 2, Dhaka"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                <FaImage className="text-purple-600 dark:text-purple-400" />
                Image URL *
              </label>
              <input
                type="url"
                name="imageURL"
                required
                value={formData.imageURL}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 outline-none transition-all duration-300"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Read-only User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t-2 border-gray-300 dark:border-gray-600 transition-colors duration-500">
              <div>
                <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                  <FaEnvelope className="text-gray-500" />
                  User Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 cursor-not-allowed transition-colors duration-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 dark:text-gray-200 text-sm transition-colors duration-500">
                  <FaUser className="text-gray-500" />
                  User Name
                </label>
                <input
                  type="text"
                  value={user.displayName || user.email}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-400 cursor-not-allowed transition-colors duration-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Property...
                </span>
              ) : (
                "✨ Add Property"
              )}
            </button>
          </form>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProperty;