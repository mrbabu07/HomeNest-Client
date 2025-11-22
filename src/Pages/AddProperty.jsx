// Pages/AddProperty.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // আপনার কনটেক্সট পাথ ম্যাচ করুন
import { createProperty } from '../services/api'; // আপনার API সার্ভিস পাথ ম্যাচ করুন
import { toast } from 'react-toastify'; // ধরে নিচ্ছি আপনি react-toastify ব্যবহার করছেন

const AddProperty = () => {
  const { user } = useContext(AuthContext); // AuthContext থেকে ইউজার নিন
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Rent', // ডিফল্ট ভ্যালু
    price: '',
    location: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast.error("You must be logged in to add a property.");
      setLoading(false);
      return;
    }

    try {
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price), // নাম্বার হিসেবে পাঠানো
        userEmail: user.email,
        userName: user.displayName || user.email // ডিসপ্লে নেইম না থাকলে ইমেইল
      };

      const newProperty = await createProperty(propertyData); // API কল
      console.log("New Property Added:", newProperty);
      toast.success('Property added successfully!');
      navigate('/my-properties'); // যোগ হলে মাই প্রোপার্টিতে যাবে
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    // যদি লগইন না করে থাকেন
    return <div>Please log in to add a property.</div>;
  }

  return (
    <div className="add-property-page p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Property Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="any"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700">Image URL *</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* User Email আর Name রিড-ওনলি হবে, অটো ফিল */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Email (Read-only)</label>
            <input
              type="text"
              value={user.email || ''}
              readOnly
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name (Read-only)</label>
            <input
              type="text"
              value={user.displayName || user.email || ''}
              readOnly
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;