// Pages/AddProperty.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: Number(formData.price),
      location: formData.location,
      imageURL: formData.imageURL,
      userEmail: user.email,
      userName: user.displayName || user.email,
    };
    axios.post('http://localhost:3000/addServices', data)
    .then(res=>{
      console.log(res);
      toast.success("Property added successfully!");
      navigate("/my-properties");
    })
    .catch(err=>{
      console.error(err);
      toast.error("Failed to add property.");
    });

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
      const res = await fetch("http://localhost:3000/addService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.insertedId) {
        toast.success("Property added successfully!");
        navigate("/my-properties");
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
      <div className="text-center py-16 text-lg font-semibold">
        You must log in first.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-colors">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Property Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100"
            placeholder="Enter property name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Description *
          </label>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md focus:ring focus:ring-blue-300 bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100"
            placeholder="Write something about the property"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Category *
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Price *
          </label>
          <input
            type="number"
            name="price"
            required
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Enter price"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Location *
          </label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Enter property location"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Image URL *
          </label>
          <input
            type="url"
            name="imageURL"
            required
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 
              rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Enter an image link"
          />
        </div>

        {/* Read-only User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              User Email
            </label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-700 
                rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              type="text"
              value={user.displayName || user.email}
              readOnly
              className="w-full p-2 border border-gray-300 dark:border-gray-700 
                rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white 
            rounded-md transition disabled:opacity-60"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
