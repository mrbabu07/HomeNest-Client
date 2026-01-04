// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import {
//   FaSpinner,
//   FaHome,
//   FaEdit,
//   FaDollarSign,
//   FaMapMarkerAlt,
//   FaImage,
//   FaTag,
// } from "react-icons/fa";

// const UpdateProperty = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Rent",
//     price: "",
//     location: "",
//     imageURL: "",
//   });

//   useEffect(() => {
//     const loadPropertyData = async () => {
//       setLoading(true);
//       setFetchError(null);

//       try {
//         const res = await axios.get(
//           `https://home-nest-server-10.vercel.app/singleService/${id}`
//         );

//         if (res.data) {
//           setFormData(res.data);
//         } else {
//           setFetchError("Property not found");
//         }
//       } catch (err) {
//         console.log("Error loading property:", err);
//         setFetchError("Failed to load property data");
//       }

//       setLoading(false);
//     };

//     loadPropertyData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error("Please log in first");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { _id, ...updateData } = formData;
//       const dataToSend = {
//         ...updateData,
//         price: Number(formData.price),
//         userEmail: user.email,
//         userName: user.displayName || user.email,
//       };

//       const response = await axios.put(
//         `https://home-nest-server-10.vercel.app/updateService/${id}`,
//         dataToSend
//       );

//       if (response.data.result?.modifiedCount > 0) {
//         // ✅ TOAST IS ALREADY HERE — NO CHANGE NEEDED
//         toast.success("Property updated successfully!");
//         setTimeout(() => {
//           navigate("/my-properties");
//         }, 1500);
//       } else {
//         toast.info("No changes were made");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update property");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchError) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
//         <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl border border-red-200 dark:border-red-800 transition-all duration-500">
//           <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
//             <FaHome className="text-3xl text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-3 transition-colors duration-500">
//             Property Not Found
//           </h3>
//           <p className="text-red-600 dark:text-red-300 transition-colors duration-500">
//             {fetchError}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-500">
//         <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-500">
//           <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//             <FaEdit className="text-3xl text-white" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 transition-colors duration-500">
//             Authentication Required
//           </h3>
//           <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
//             Please log in to update properties.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-500">
//       <div className="max-w-2xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl shadow-lg mb-4 transition-all duration-500">
//             <FaEdit className="text-2xl text-white" />
//           </div>
//           <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-500">
//             Update Property
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">
//             Modify your property listing details
//           </p>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-500">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Property Name */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                 <FaHome className="text-blue-500" />
//                 Property Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 placeholder="Enter property name"
//               />
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                 <FaEdit className="text-blue-500" />
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 rows="4"
//                 required
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
//                 placeholder="Describe your property..."
//               ></textarea>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Category */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                   <FaTag className="text-blue-500" />
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   required
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
//                 >
//                   <option value="Rent">Rent</option>
//                   <option value="Sale">Sale</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Land">Land</option>
//                 </select>
//               </div>

//               {/* Price */}
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                   <FaDollarSign className="text-blue-500" />
//                   Price *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   required
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                   placeholder="Enter price"
//                 />
//               </div>
//             </div>

//             {/* Location */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                 <FaMapMarkerAlt className="text-blue-500" />
//                 Location *
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 required
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 placeholder="Enter property location"
//               />
//             </div>

//             {/* Image URL */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-500">
//                 <FaImage className="text-blue-500" />
//                 Image URL *
//               </label>
//               <input
//                 type="url"
//                 name="imageURL"
//                 required
//                 value={formData.imageURL}
//                 onChange={handleChange}
//                 className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>

//             {/* Update Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
//             >
//               {loading ? (
//                 <>
//                   <FaSpinner className="animate-spin text-xl" />
//                   Updating Property...
//                 </>
//               ) : (
//                 <>
//                   <FaEdit />
//                   Update Property
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>

//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default UpdateProperty;

// src/Pages/UpdateProperty.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  FaSpinner,
  FaHome,
  FaEdit,
  FaDollarSign,
  FaMapMarkerAlt,
  FaImage,
  FaTag,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaCheckCircle,
} from "react-icons/fa";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "rent",
    price: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    parking: false,
    amenities: [],
    imageURLs: [""],
  });
  const [newAmenity, setNewAmenity] = useState("");

  useEffect(() => {
    const loadPropertyData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        // ✅ FIXED: Removed extra spaces
        const res = await axios.get(
          `https://home-nest-server-10.vercel.app/singleService/${id}`
        );

        if (res.data) {
          const data = res.data;
          setFormData({
            name: data.name || "",
            description: data.description || "",
            category: (data.category || "rent").toLowerCase(),
            price: data.price || "",
            location: data.location || "",
            bedrooms: data.bedrooms || "",
            bathrooms: data.bathrooms || "",
            area: data.area || "",
            parking: Boolean(data.parking),
            amenities: Array.isArray(data.amenities) ? data.amenities : [],
            imageURLs:
              Array.isArray(data.imageURLs) && data.imageURLs.length > 0
                ? data.imageURLs
                : [data.imageURL || ""],
          });
        } else {
          setFetchError("Property not found");
        }
      } catch (err) {
        console.error("Error loading property:", err);
        setFetchError("Failed to load property data");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadPropertyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newURLs = [...formData.imageURLs];
    newURLs[index] = value;
    setFormData({ ...formData, imageURLs: newURLs });
  };

  const addImageField = () => {
    setFormData({ ...formData, imageURLs: [...formData.imageURLs, ""] });
  };

  const removeImageField = (index) => {
    if (formData.imageURLs.length > 1) {
      const newURLs = formData.imageURLs.filter((_, i) => i !== index);
      setFormData({ ...formData, imageURLs: newURLs });
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()],
      });
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((a) => a !== amenity),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    const validImages = formData.imageURLs.filter((url) => url.trim());
    if (validImages.length === 0) {
      toast.error("Please add at least one image URL");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        location: formData.location,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        area: formData.area,
        parking: Boolean(formData.parking),
        amenities: formData.amenities,
        imageURLs: validImages,
        ownerEmail: user.email,
        ownerName: user.displayName || user.email.split("@")[0],
      };

      // ✅ FIXED: Clean URL
      await axios.put(
        `https://home-nest-server-10.vercel.app/updateService/${id}`,
        payload
      );

      toast.success("Property updated successfully!");
      setTimeout(() => navigate("/my-properties"), 1500);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-error/10 rounded-xl border border-error max-w-md">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHome className="text-2xl text-error-content" />
          </div>
          <h3 className="text-xl font-bold text-error mb-2">
            Property Not Found
          </h3>
          <p className="text-error/80">{fetchError}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl border border-base-200 max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEdit className="text-2xl text-primary-content" />
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">
            Login Required
          </h3>
          <p className="text-base-content/70">
            Please log in to update properties.
          </p>
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
            <FaEdit className="text-xl text-primary-content" />
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Update Property
          </h2>
          <p className="text-base-content/70">
            Modify your property listing details
          </p>
        </div>

        <div className="bg-base-100 rounded-xl shadow border border-base-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaHome className="text-primary" /> Property Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaMapMarkerAlt className="text-error" /> Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium text-base-content">
                Description *
              </label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium text-base-content">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="rent">🏠 Rent</option>
                  <option value="sale">💰 Sale</option>
                  <option value="commercial">🏢 Commercial</option>
                  <option value="land">🌳 Land</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                  <FaDollarSign className="text-success" /> Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="1"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-base-content">
                  <FaBed className="text-primary" /> Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-base-content">
                  <FaBath className="text-primary" /> Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-2 text-sm text-base-content">
                  <FaRulerCombined className="text-primary" /> Area (sqft)
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g., 1200 sqft"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleChange}
                className="checkbox checkbox-primary mr-3"
              />
              <label className="text-base-content">Parking Available</label>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-2 font-medium text-base-content">
                Amenities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="input input-bordered flex-1"
                  placeholder="Add amenity"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAmenity())
                  }
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.amenities.map((amenity, i) => (
                    <div key={i} className="badge badge-primary gap-1">
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeAmenity(amenity)}
                        className="text-primary-content hover:text-error"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Multiple Images */}
            <div>
              <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
                <FaImage className="text-secondary" /> Property Images *
              </label>
              {formData.imageURLs.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="input input-bordered flex-1"
                    placeholder={`Image URL ${index + 1}`}
                  />
                  {formData.imageURLs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="btn btn-secondary btn-sm mt-2"
              >
                + Add Another Image
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary btn-lg"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Updating Property...
                </>
              ) : (
                <>
                  <FaEdit /> Update Property
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UpdateProperty;
