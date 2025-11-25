// Pages/UpdateProperty.jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    imageURL: "",
  });
  console.log("Form Data:", formData);

  // Fetch old property
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/singleService/${id}`)
      .then((res) => {
        if (!res.data) {
          setError("Property not found");
          return;
        }
        setFormData(res.data);
      })
      .catch(() => setError("Failed to fetch property"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  // Update property
  // Update property
const handleUpdate = async (e) => {
  e.preventDefault();

  if (!user) {
    toast.error("Please log in first");
    return;
  }

  setLoading(true);

  // ✅ Destructure to exclude _id (and any other MongoDB metadata)
  const { _id, ...updateFields } = formData;

  const payload = {
    ...updateFields,
    price: Number(formData.price),
    userEmail: user.email,
    userName: user.displayName || user.email,
  };

  try {
    const res = await axios.put(`${API_BASE_URL}/updateService/${id}`, payload);

    // ✅ Backend now returns { message, result }, so check result.modifiedCount
    if (res.data.result?.modifiedCount > 0) {
      toast.success("Property updated successfully!");
      navigate("/my-properties");
    } else {
      toast.error("Update failed or no changes were made.");
    }
  } catch (err) {
    console.error("Update error:", err);
    toast.error("Failed to update property. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (error) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-16 text-lg font-semibold">
        You must log in first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Update Property</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        
        {/* Name */}
        <div>
          <label>Property Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description *</label>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label>Category *</label>
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
          <label>Price *</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Location */}
        <div>
          <label>Location *</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Image URL */}
        <div>
          <label>Image URL *</label>
          <input
            type="url"
            name="imageURL"
            required
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Update button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
