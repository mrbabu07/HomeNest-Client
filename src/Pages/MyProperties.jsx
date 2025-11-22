// Pages/MyProperties.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext'; // আপনার কনটেক্সট পাথ ম্যাচ করুন
import { fetchProperties, deleteProperty } from '../services/api'; // আপনার API সার্ভিস পাথ ম্যাচ করুন
import { toast } from 'react-toastify'; // ধরে নিচ্ছি আপনি react-toastify ব্যবহার করছেন
import { FaSpinner } from 'react-icons/fa'; // লোডিং স্পিনারের জন্য

const MyProperties = () => {
  const { user, loading: authLoading } = useContext(AuthContext); // AuthContext থেকে ইউজার নিন
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return; // Auth loading চলছে তাহলে আর কিছু করবে না

    if (!user) {
      // লগইন না করলে প্রাইভেট রুট এর মতো কাজ করবে (App.js এর PrivateRoute এর মাধ্যমে হওয়া উচিত, তবু এখানেও চেক করা যেতে পারে)
      navigate('/login');
      return;
    }

    const getMyProperties = async () => {
      try {
        setLoading(true);
        // সার্ভারে এমন একটা API হতে হবে যেখানে userEmail দিলে সেই ইউজারের প্রোপার্টি পাওয়া যাবে
        // এখন সব প্রোপার্টি ফেচ করে ক্লায়েন্ট-সাইডে ফিল্টার করছি, এটি সার্ভারে করা উচিত।
        const allProperties = await fetchProperties();
        const userProperties = allProperties.filter(p => p.userEmail === user.email);
        setProperties(userProperties);
      } catch (err) {
        console.error("Error fetching my properties:", err);
        setError('Failed to load your properties.');
      } finally {
        setLoading(false);
      }
    };

    getMyProperties();
  }, [user, authLoading, navigate]);

  const handleDelete = async (id) => {
    // কনফার্মেশন ডায়লগ (toast ব্যবহার করে না, SweetAlert ব্যবহার করতে হবে)
    // ধরে নিচ্ছি SweetAlert2 ব্যবহার করছেন
    // import Swal from 'sweetalert2';
    // const result = await Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // });
    // if (result.isConfirmed) { ... }

    // অথবা react-toastify এর confirm নেই। আপনি চাইলে একটা কাস্টম মডাল ব্যবহার করতে পারেন।
    // এখানে সাধারণ কনফার্মেশন ব্যবহার করছি।
    const confirmed = window.confirm("Are you sure you want to delete this property? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteProperty(id); // API কল
      // ডিলিট হলে UI থেকে সরানো
      setProperties(properties.filter(property => property._id !== id));
      toast.success('Property deleted successfully!');
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error('Failed to delete property. Please try again.');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="my-properties-page p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Properties</h2>
      {properties.length === 0 ? (
        <p className="text-center text-gray-500">You haven't listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img src={property.imageURL} alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
                <p className="text-blue-600 font-medium">{property.category}</p>
                <p className="text-gray-600 truncate">📍 {property.location}</p>
                <p className="text-gray-800 font-bold">💰 ${property.price}</p>
                <p className="text-sm text-gray-500 mt-1">📅 {new Date(property.dateAdded).toLocaleDateString()}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/property/${property._id}`)}
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                  >
                    View Details
                  </button>
                  {/* Update button এখানে যোগ করতে পারেন, তবে EditProperty.jsx তৈরি করতে হবে */}
                  {/* <button
                    onClick={() => navigate(`/edit-property/${property._id}`)}
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
                  >
                    Update
                  </button> */}
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;