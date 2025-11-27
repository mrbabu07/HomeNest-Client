
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { FaSpinner, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`${API_BASE_URL}/allServices`, { params: { email: user.email } })
      .then((res) => {
        setProperties(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Couldn't load your properties.");
        setLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/deleteService/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully!");
    } catch {
      toast.error("Failed to delete property.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-primary-content">🏠</span>
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">Login Required</h3>
          <p className="text-base-content/70">You must log in to view your properties.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="animate-spin text-5xl text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">My Properties</h1>
          <p className="text-base-content/70 mt-2">Manage all your listed properties</p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-lg shadow border border-base-200 max-w-2xl mx-auto">
            <div className="text-5xl mb-4 text-base-content/50">🏠</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No Properties Yet</h3>
            <p className="text-base-content/70 mb-6">Start by adding your first property</p>
            <Link
              to="/add-property"
              className="inline-block px-6 py-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
            >
              Add Property
            </Link>
          </div>
        ) : (
          <div className="bg-base-100 rounded-lg shadow border border-base-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200 text-base-content">
                  <tr>
                    <th className="p-4 text-left font-semibold">Image</th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Category</th>
                    <th className="p-4 text-left font-semibold">Price</th>
                    <th className="p-4 text-left font-semibold">Location</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {properties.map((p) => (
                    <tr key={p._id} className="hover:bg-base-200 transition">
                      <td className="p-4">
                        <img
                          src={p.imageURL || "https://via.placeholder.com/150"}
                          alt={p.name}
                          className="h-16 w-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </td>
                      <td className="p-4 font-medium text-base-content">{p.name}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-base-content">৳{p.price?.toLocaleString()}</td>
                      <td className="p-4 text-base-content/80">{p.location}</td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/property/${p._id}`}
                            className="p-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/update-property/${p._id}`}
                            className="p-2 bg-green-800 text-secondary-content rounded-lg hover:opacity-90 transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-2 bg-red-400 text-error-content rounded-lg hover:opacity-90 transition"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-base-200">
              {properties.map((p) => (
                <div key={p._id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={p.imageURL || "https://via.placeholder.com/150"}
                      alt={p.name}
                      className="h-24 w-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-base-content mb-1">{p.name}</h3>
                      <p className="text-sm text-base-content/70 mb-1">{p.location}</p>
                      <p className="font-bold text-base-content">৳{p.price?.toLocaleString()}</p>
                      <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Link
                      to={`/property/${p._id}`}
                      className="px-3 py-2 bg-primary text-primary-content text-center rounded-lg hover:opacity-90 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update-property/${p._id}`}
                      className="px-3 py-2 bg-secondary text-secondary-content text-center rounded-lg hover:opacity-90 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-2 bg-error text-error-content rounded-lg hover:opacity-90 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;