// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import AuthContext from "../Context/AuthContext";
// import { FaSpinner } from "react-icons/fa";

// const UpdateProperty = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     price: "",
//     location: "",
//     imageURL: "",
//     userName: "",
//     userEmail: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Fetch existing property data
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/singleService/${id}`)
//       .then((res) => {
//         const p = res.data;
//         setFormData({
//           name: p.name,
//           description: p.description,
//           category: p.category,
//           price: p.price,
//           location: p.location,
//           imageURL: p.imageURL,
//           userName: p.userName,
//           userEmail: p.userEmail,
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         toast.error("Failed to load property");
//         setLoading(false);
//       });
//   }, [id]);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Submit Update
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     setUpdating(true);

//     axios
//       .put(`http://localhost:3000/updateService/${id}`, formData)
//       .then((res) => {
//         toast.success("Property Updated Successfully!");
//         setUpdating(false);

//         // Navigate to Details Page
//         navigate(`/property/${id}`, { replace: true });
//       })
//       .catch((err) => {
//         console.error("Update failed:", err);
//         toast.error("Failed to update property");
//         setUpdating(false);
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <FaSpinner className="animate-spin text-4xl text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Update Property</h2>

//       <form onSubmit={handleUpdate} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="block mb-1">Property Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//             rows={3}
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block mb-1">Category</label>
//           <input
//             type="text"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block mb-1">Price (৳)</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Image */}
//         <div>
//           <label className="block mb-1">Image Link</label>
//           <input
//             type="text"
//             name="imageURL"
//             value={formData.imageURL}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Read-only fields */}
//         <div>
//           <label className="block mb-1">User Name (read-only)</label>
//           <input
//             type="text"
//             value={formData.userName}
//             readOnly
//             className="w-full bg-gray-100 border p-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block mb-1">User Email (read-only)</label>
//           <input
//             type="text"
//             value={formData.userEmail}
//             readOnly
//             className="w-full bg-gray-100 border p-2 rounded"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={updating}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {updating ? "Updating..." : "Update Property"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProperty;
