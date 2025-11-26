import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { FaSpinner, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // Fetch properties
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

  // Delete handler
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <FaSpinner className="animate-spin text-5xl text-blue-600 dark:text-blue-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            My Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all your listed properties
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-6xl mb-4 text-gray-400 dark:text-gray-600">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Properties Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start by adding your first property
            </p>
            <Link
              to="/add-property"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Add Property
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className="text-gray-900 dark:text-gray-200">
                    <th className="p-4 text-left font-semibold">Image</th>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Category</th>
                    <th className="p-4 text-left font-semibold">Price</th>
                    <th className="p-4 text-left font-semibold">Location</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {properties.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <td className="p-4">
                        <img
                          src={p.imageURL}
                          alt={p.name}
                          className="h-16 w-24 object-cover rounded-lg shadow"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </td>

                      <td className="p-4">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {p.name}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          p.category === "Rent"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}>
                          {p.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-gray-900 dark:text-gray-100">
                        ৳{p.price?.toLocaleString()}
                      </td>

                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {p.location}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/property/${p._id}`}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                            title="View"
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/update-property/${p._id}`}
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(p._id)}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
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
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {properties.map((p) => (
                <div key={p._id} className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={p.imageURL}
                      alt={p.name}
                      className="h-24 w-32 object-cover rounded-lg shadow"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {p.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {p.location}
                      </p>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        ৳{p.price?.toLocaleString()}
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                        p.category === "Rent"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}>
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/property/${p._id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                    >
                      View
                    </Link>

                    <Link
                      to={`/update-property/${p._id}`}
                      className="flex-1 px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
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
      <ToastContainer/>
    </div>
  );
};

export default MyProperties;