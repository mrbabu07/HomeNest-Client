// src/Pages/AddProperty.jsx
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHome className="text-2xl text-primary-content" />
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">Login Required</h3>
          <p className="text-base-content/70">You must log in first to add a property.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
            <FaHome className="text-xl text-primary-content" />
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">Add New Property</h2>
          <p className="text-base-content/70">Share your property with thousands of potential buyers and renters</p>
        </div>

        {/* Form */}
        <div className="bg-base-100 rounded-xl shadow border border-base-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Name */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                <FaHome className="text-primary" /> Property Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="e.g., Modern Apartment in Gulshan"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-base-content">Description *</label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Describe your property in detail..."
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-base-content">Category *</label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="Rent">🏠 Rent</option>
                  <option value="Sale">💰 Sale</option>
                  <option value="Commercial">🏢 Commercial</option>
                  <option value="Land">🌳 Land</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaDollarSign className="text-success" /> Price (BDT) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-success focus:border-transparent outline-none"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                <FaMapMarkerAlt className="text-error" /> Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-error focus:border-transparent outline-none"
                placeholder="e.g., Gulshan 2, Dhaka"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                <FaImage className="text-secondary" /> Image URL *
              </label>
              <input
                type="url"
                name="imageURL"
                required
                value={formData.imageURL}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Read-only User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-200">
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaEnvelope className="text-base-content/70" /> User Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-200 text-base-content/70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaUser className="text-base-content/70" /> User Name
                </label>
                <input
                  type="text"
                  value={user.displayName || user.email}
                  readOnly
                  className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-200 text-base-content/70 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-content font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Adding Property..." : "Add Property"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="center"/>
    </div>
    
  );
};

export default AddProperty;