// Pages/AddProperty.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

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
      <div className="text-center py-16 text-lg font-semibold">
        You must log in first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Add New Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Name */}
        <div>
          <label className="block mb-1 font-medium">Property Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter property name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Write something about the property"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price *</label>
          <input
            type="number"
            name="price"
            required
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter price"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location *</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter property location"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL *</label>
          <input
            type="url"
            name="imageURL"
            required
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter an image link"
          />
        </div>

        {/* Read-only User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">User Email</label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">User Name</label>
            <input
              type="text"
              value={user.displayName || user.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddProperty;
