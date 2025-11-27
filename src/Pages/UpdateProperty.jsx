// Pages/UpdateProperty.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaSpinner, FaHome, FaEdit, FaDollarSign, FaMapMarkerAlt, FaImage, FaTag } from "react-icons/fa";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Rent",
    price: "",
    location: "",
    imageURL: "",
  });

  useEffect(() => {
    const loadPropertyData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const response = await axios.get(`http://localhost:3000/singleService/${id}`);
        
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

    loadPropertyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in first");
      return;
    }

    setLoading(true);

    try {
      const { _id, ...updateData } = formData;
      const dataToSend = {
        ...updateData,
        price: Number(formData.price),
        userEmail: user.email,
        userName: user.displayName || user.email,
      };

      const response = await axios.put(
        `http://localhost:3000/updateService/${id}`,
        dataToSend
      );

      if (response.data.result?.modifiedCount > 0) {
        // ✅ TOAST IS ALREADY HERE — NO CHANGE NEEDED
        toast.success("Property updated successfully!");
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

  if (fetchError) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
            <FaHome className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-3 transition-colors duration-500">
            Property Not Found
          </h3>
          <p className="text-red-600 dark:text-red-300 transition-colors duration-500">
            {fetchError}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <FaEdit className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 transition-colors duration-500">
            Authentication Required
          </h3>
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
            Please log in to update properties.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-500">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-lg mb-4 transition-all duration-500">
            <FaEdit className="text-2xl text-white" />
          </div>
          <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-500">
            Update Property
          </h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
            Modify your property listing details
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Property Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                <FaHome className="text-blue-500" />
                Property Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter property name"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                <FaEdit className="text-blue-500" />
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                placeholder="Describe your property..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                  <FaTag className="text-blue-500" />
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                >
                  <option value="Rent">Rent</option>
                  <option value="Sale">Sale</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                  <FaDollarSign className="text-blue-500" />
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Enter price"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                <FaMapMarkerAlt className="text-blue-500" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter property location"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
                <FaImage className="text-blue-500" />
                Image URL *
              </label>
              <input
                type="url"
                name="imageURL"
                required
                value={formData.imageURL}
                onChange={handleChange}
                className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin text-xl" />
                  Updating Property...
                </>
              ) : (
                <>
                  <FaEdit />
                  Update Property
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default UpdateProperty;