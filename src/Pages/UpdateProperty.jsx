// Pages/UpdateProperty.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const UpdateProperty = () => {
  // Get property ID from URL
  const { id } = useParams();
  
  // Get logged in user info
  const { user } = useContext(AuthContext);
  
  // For navigation after update
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    imageURL: "",
  });

  // Fetch property data when component loads
  useEffect(() => {
    // Function to load property data
    const loadPropertyData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        // Get property from API
        const response = await axios.get(`${API_BASE_URL}/singleService/${id}`);
        
        // Check if data exists
        if (response.data) {
          setFormData(response.data);
        } else {
          setFetchError("Property not found");
        }
      } catch (error) {
        console.error("Error loading property:", error);
        setFetchError("Failed to load property data");
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    loadPropertyData();
  }, [id]); // Run only when ID changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    setLoading(true);

    try {
      // Remove _id from formData (MongoDB doesn't allow updating _id)
      const { _id, ...updateData } = formData;

      // Prepare data to send
      const dataToSend = {
        ...updateData,
        price: Number(formData.price), // Convert price to number
        userEmail: user.email,
        userName: user.displayName || user.email,
      };

      // Send update request
      const response = await axios.put(
        `${API_BASE_URL}/updateService/${id}`,
        dataToSend
      );

      // Check if update was successful
      if (response.data.result?.modifiedCount > 0) {
        toast.success("Property updated successfully!");
        
        // Wait 1.5 seconds then navigate
        setTimeout(() => {
          navigate("/my-properties");
        }, 1500);
      } else {
        toast.info("No changes were made");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  // Show error if property couldn't be loaded
  if (fetchError) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        {fetchError}
      </div>
    );
  }

  // Show message if user not logged in
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

      <form onSubmit={handleSubmit} className="space-y-4">
        
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