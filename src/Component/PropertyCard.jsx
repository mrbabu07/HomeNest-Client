// Component/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  // ডেসক্রিপশন ছোট করে দেখানো
  const truncateDescription = (str, maxLength = 100) => {
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <img src={property.imageURL} alt={property.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{property.name}</h3>
        <p className="text-blue-600 font-medium">{property.category}</p>
        <p className="text-gray-600 text-sm mt-1 truncate">{truncateDescription(property.description)}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-800 font-bold">💰 ${property.price}</p>
          <p className="text-gray-600 text-sm">📍 {property.location}</p>
        </div>
        {/* যদি এটি My Properties পেজে ব্যবহার হয়, তাহলে "Posted by" দেখানো যাবে না */}
        {/* এখন শুধু All Properties পেজে দেখাচ্ছি */}
        {/* {window.location.pathname.includes('/properties') && ( */}
        {/*   <p className="text-xs text-gray-500 mt-1">Posted by: {property.userName}</p> */}
        {/* )} */}
        {/* বা প্রপ দিয়ে কন্ট্রোল করুন */}
        {property.showPostedBy && <p className="text-xs text-gray-500 mt-1">Posted by: {property.userName}</p>}
        <Link
          to={`/property/${property._id}`}
          className="mt-3 block text-center text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;