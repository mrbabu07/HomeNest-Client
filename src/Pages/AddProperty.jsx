// // src/Pages/AddProperty.jsx
// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import {
//   FaHome,
//   FaMapMarkerAlt,
//   FaDollarSign,
//   FaImage,
//   FaUser,
//   FaEnvelope,
// } from "react-icons/fa";

// const AddProperty = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     category: "Rent",
//     price: "",
//     location: "",
//     imageURL: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error("Please log in to add a property.");
//       return;
//     }

//     setLoading(true);
//     const payload = {
//       ...formData,
//       price: Number(formData.price),
//       userEmail: user.email,
//       userName: user.displayName || user.email,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:3000/addService",
//         payload
//       );
//       if (res.data.insertedId) {
//         toast.success("Property added successfully!");
//         setTimeout(() => navigate("/my-properties"), 1200);
//       } else {
//         toast.error("Something went wrong!");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add property.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
//           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaHome className="text-2xl text-primary-content" />
//           </div>
//           <h3 className="text-xl font-bold text-base-content mb-2">
//             Login Required
//           </h3>
//           <p className="text-base-content/70">
//             You must log in first to add a property.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-100 py-8 ">
//       <div className="max-w-3xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
//             <FaHome className="text-xl text-primary-content" />
//           </div>
//           <h2 className="text-3xl font-bold text-base-content mb-3">
//             Add New Property
//           </h2>
//           <p className="text-base-content/70">
//             Share your property with thousands of potential buyers and renters
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-base-100 rounded-xl shadow  border-base-200 p-6 border-4 stroke-1-blue-500">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Property Name */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                 <FaHome className="text-primary" /> Property Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
//                 placeholder="e.g., Modern Apartment in Gulshan"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block mb-2 font-medium text-base-content">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 rows="4"
//                 required
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
//                 placeholder="Describe your property in detail..."
//               />
//             </div>

//             {/* Category & Price */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-2 font-medium text-base-content">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   required
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
//                 >
//                   <option value="Rent">🏠 Rent</option>
//                   <option value="Sale">💰 Sale</option>
//                   <option value="Commercial">🏢 Commercial</option>
//                   <option value="Land">🌳 Land</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                   <FaDollarSign className="text-success" /> Price (BDT) *
//                 </label>
//                 <input
//                   type="number"
//                   name="price"
//                   required
//                   min="0"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-success focus:border-transparent outline-none"
//                   placeholder="Enter price"
//                 />
//               </div>
//             </div>

//             {/* Location */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                 <FaMapMarkerAlt className="text-error" /> Location *
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 required
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-error focus:border-transparent outline-none"
//                 placeholder="e.g., Gulshan 2, Dhaka"
//               />
//             </div>

//             {/* Image URL */}
//             <div>
//               <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                 <FaImage className="text-secondary" /> Image URL *
//               </label>
//               <input
//                 type="url"
//                 name="imageURL"
//                 required
//                 value={formData.imageURL}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-100 text-base-content focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>

//             {/* Read-only User Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-200">
//               <div>
//                 <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                   <FaEnvelope className="text-base-content/70" /> User Email
//                 </label>
//                 <input
//                   type="text"
//                   value={user.email}
//                   readOnly
//                   className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-200 text-base-content/70 cursor-not-allowed"
//                 />
//               </div>
//               <div>
//                 <label className="flex items-center gap-2 mb-2 font-medium text-base-content">
//                   <FaUser className="text-base-content/70" /> User Name
//                 </label>
//                 <input
//                   type="text"
//                   value={user.displayName || user.email}
//                   readOnly
//                   className="w-full px-3 py-2.5 border border-base-200 rounded-lg bg-base-200 text-base-content/70 cursor-not-allowed"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-content font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
//             >
//               {loading ? "Adding Property..." : "Add Property"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer position="center" />
//     </div>
//   );
// };

// export default AddProperty;

// src/Pages/AddProperty.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
  FaImage,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaParking,
  FaCheckCircle,
} from "react-icons/fa";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [imageURLs, setImageURLs] = useState([""]); // Support multiple images

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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newURLs = [...imageURLs];
    newURLs[index] = value;
    setImageURLs(newURLs);
  };

  const addImageField = () => {
    setImageURLs([...imageURLs, ""]);
  };

  const removeImageField = (index) => {
    if (imageURLs.length > 1) {
      const newURLs = imageURLs.filter((_, i) => i !== index);
      setImageURLs(newURLs);
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenityToRemove) => {
    setAmenities(amenities.filter((a) => a !== amenityToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to add a property.");
      return;
    }

    // Validation
    if (!formData.price || Number(formData.price) <= 0) {
      toast.error("Please enter a valid price greater than 0.");
      return;
    }

    const validImages = imageURLs.filter((url) => url.trim());
    if (validImages.length === 0) {
      toast.error("Please add at least one valid image URL.");
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      area: formData.area || "",
      parking: Boolean(formData.parking),
      amenities,
      imageURLs: validImages,
      ownerEmail: user.email,
      ownerName: user.displayName || user.email.split("@")[0],
    };

    try {
      // ✅ FIXED: Removed extra spaces in URL
      const res = await axios.post("http://localhost:3000/addService", payload);
      if (res.data.insertedId) {
        toast.success("Property added successfully!");
        setTimeout(() => navigate("/my-properties"), 1200);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add property. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border border-base-200 max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHome className="text-2xl text-primary-content" />
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">
            Login Required
          </h3>
          <p className="text-base-content/70">
            You must log in first to add a property.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl shadow mb-4">
            <FaHome className="text-xl text-primary-content" />
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Add New Property
          </h2>
          <p className="text-base-content/70">
            Share your property with thousands of potential buyers and renters
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
                  placeholder="e.g., Modern Apartment in Gulshan"
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
                  placeholder="e.g., Gulshan 2, Dhaka"
                />
              </div>
            </div>

            {/* Description */}
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
                placeholder="Describe your property in detail..."
              />
            </div>

            {/* Category & Price */}
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
                  placeholder="Enter price"
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

            {/* Parking */}
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
                  placeholder="Add amenity (e.g., AC, Gym)"
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
              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {amenities.map((amenity, i) => (
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
              {imageURLs.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="input input-bordered flex-1"
                    placeholder={`Image URL ${index + 1}`}
                  />
                  {imageURLs.length > 1 && (
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary btn-lg"
            >
              {loading ? "Adding Property..." : "Add Property"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddProperty;
