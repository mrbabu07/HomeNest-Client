// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";
// import { FaSpinner, FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// const MyProperties = () => {
//   const { user } = useContext(AuthContext);
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     setLoading(true);

//     axios
//       .get("http://localhost:3000/myServices", {
//         params: { email: user.email },
//       })
//       .then((res) => {
//         setProperties(res.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         toast.error("Couldn't load your properties.");
//         setLoading(false);
//       });
//   }, [user]);

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to undo this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//       cancelButtonText: "Cancel",
//     });

//     if (!result.isConfirmed) return;

//     try {
//       await axios.delete(
//         `http://localhost:3000/deleteService/${id}`
//       );

//       setProperties((prev) => prev.filter((p) => p._id !== id));

//       toast.success("Property deleted successfully!");

//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "Property has been removed.",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch {
//       toast.error("Failed to delete property.");

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong!",
//       });
//     }
//   };
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <div className="text-center p-8 bg-base-100 rounded-xl shadow border max-w-md">
//           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-2xl text-primary-content">🏠</span>
//           </div>
//           <h3 className="text-xl font-bold text-base-content mb-2">
//             Login Required
//           </h3>
//           <p className="text-base-content/70">
//             You must log in to view your properties.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-base-100">
//         <FaSpinner className="animate-spin text-5xl text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-100 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-base-content">
//             My Properties
//           </h1>
//           <p className="text-base-content/70 mt-2">
//             Manage all your listed properties
//           </p>
//         </div>

//         {properties.length === 0 ? (
//           <div className="text-center py-16 bg-base-100 rounded-lg shadow border border-base-200 max-w-2xl mx-auto">
//             <div className="text-5xl mb-4 text-base-content/50">🏠</div>
//             <h3 className="text-xl font-semibold text-base-content mb-2">
//               No Properties Yet
//             </h3>
//             <p className="text-base-content/70 mb-6">
//               Start by adding your first property
//             </p>
//             <Link
//               to="/add-property"
//               className="inline-block px-6 py-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
//             >
//               Add Property
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-base-100 rounded-lg shadow border border-base-200 overflow-hidden">
//             {/* Desktop Table */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-base-200 text-base-content">
//                   <tr>
//                     <th className="p-4 text-left font-semibold">Image</th>
//                     <th className="p-4 text-left font-semibold">Name</th>
//                     <th className="p-4 text-left font-semibold">Category</th>
//                     <th className="p-4 text-left font-semibold">Price</th>
//                     <th className="p-4 text-left font-semibold">Location</th>
//                     <th className="p-4 text-center font-semibold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-base-200">
//                   {properties.map((p) => (
//                     <tr key={p._id} className="hover:bg-base-200 transition">
//                       <td className="p-4">
//                         <img
//                           src={p.imageURL || "https://via.placeholder.com/150"}
//                           alt={p.name}
//                           className="h-16 w-24 object-cover rounded-lg"
//                           onError={(e) => {
//                             e.target.src = "https://via.placeholder.com/150";
//                           }}
//                         />
//                       </td>
//                       <td className="p-4 font-medium text-base-content">
//                         {p.name}
//                       </td>
//                       <td className="p-4">
//                         <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
//                           {p.category}
//                         </span>
//                       </td>
//                       <td className="p-4 font-bold text-base-content">
//                         ৳{p.price?.toLocaleString()}
//                       </td>
//                       <td className="p-4 text-base-content/80">{p.location}</td>
//                       <td className="p-4">
//                         <div className="flex justify-center gap-2">
//                           <Link
//                             to={`/property/${p._id}`}
//                             className="p-2 bg-primary text-primary-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaEye />
//                           </Link>
//                           <Link
//                             to={`/update-property/${p._id}`}
//                             className="p-2 bg-green-800 text-secondary-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaEdit />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(p._id)}
//                             className="p-2 bg-red-400 text-error-content rounded-lg hover:opacity-90 transition"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden divide-y divide-base-200">
//               {properties.map((p) => (
//                 <div key={p._id} className="p-4">
//                   <div className="flex gap-4">
//                     <img
//                       src={p.imageURL || "https://via.placeholder.com/150"}
//                       alt={p.name}
//                       className="h-24 w-32 object-cover rounded-lg"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-semibold text-base-content mb-1">
//                         {p.name}
//                       </h3>
//                       <p className="text-sm text-base-content/70 mb-1">
//                         {p.location}
//                       </p>
//                       <p className="font-bold text-base-content">
//                         ৳{p.price?.toLocaleString()}
//                       </p>
//                       <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
//                         {p.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-3 gap-2 mt-4">
//                     <Link
//                       to={`/property/${p._id}`}
//                       className="px-3 py-2 bg-primary text-primary-content text-center rounded-lg hover:opacity-90 transition"
//                     >
//                       View
//                     </Link>
//                     <Link
//                       to={`/update-property/${p._id}`}
//                       className="px-3 py-2 bg-secondary text-secondary-content text-center rounded-lg hover:opacity-90 transition"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="px-3 py-2 bg-error text-error-content rounded-lg hover:opacity-90 transition"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProperties;

// src/Pages/MyProperties.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import {
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaHome,
  FaBuilding,
  FaStar,
  FaHeart,
  FaFileExport,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyProperties = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setProperties([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get("http://localhost:3000/myServices", {
        params: { email: user.email },
      })
      .then((res) => {
        setProperties(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading properties:", error);
        toast.error("Couldn't load your properties.");
        setProperties([]);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/deleteService/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted successfully!");

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Property has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete property.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  };

  // ✅ Export to CSV function
  const handleExportCSV = () => {
    if (properties.length === 0) {
      toast.info("No properties to export");
      return;
    }

    const headers = [
      "Name",
      "Category",
      "Price",
      "Location",
      "Owner",
      "Posted Date",
    ];
    const csvData = properties.map((p) => [
      p.name,
      p.category,
      p.price,
      p.location,
      p.ownerName,
      new Date(p.postedDate).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-properties-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Properties exported successfully!");
  };

  // ✅ Calculate statistics
  const stats = {
    total: properties.length,
    forRent: properties.filter((p) => p.category?.toLowerCase() === "rent")
      .length,
    forSale: properties.filter((p) => p.category?.toLowerCase() === "sale")
      .length,
    totalReviews: properties.reduce(
      (sum, p) => sum + (p.reviews?.length || 0),
      0
    ),
    avgRating:
      properties.length > 0
        ? (
            properties.reduce((sum, p) => sum + (p.rating || 0), 0) /
            properties.length
          ).toFixed(1)
        : 0,
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow border border-base-200 max-w-md">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-primary-content">🏠</span>
          </div>
          <h3 className="text-xl font-bold text-base-content mb-2">
            Login Required
          </h3>
          <p className="text-base-content/70">
            You must log in to view your properties.
          </p>
          <Link to="/login" className="mt-4 btn btn-primary">
            Go to Login
          </Link>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            My Properties
          </h1>
          <p className="text-base-content/70 mt-2">
            Manage all your listed properties
          </p>
        </div>

        {/* ========== STATISTICS CARDS ========== */}
        {properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Listings */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.total}</div>
                  <div className="text-sm opacity-90 mt-1">Total Listings</div>
                </div>
                <FaHome className="text-4xl opacity-30" />
              </div>
            </div>

            {/* For Rent */}
            <div className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.forRent}</div>
                  <div className="text-sm opacity-90 mt-1">For Rent</div>
                </div>
                <FaBuilding className="text-4xl opacity-30" />
              </div>
            </div>

            {/* For Sale */}
            <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.forSale}</div>
                  <div className="text-sm opacity-90 mt-1">For Sale</div>
                </div>
                <FaBuilding className="text-4xl opacity-30" />
              </div>
            </div>

            {/* Average Rating */}
            <div className="bg-gradient-to-br from-warning to-warning/80 text-warning-content p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{stats.avgRating}</div>
                  <div className="text-sm opacity-90 mt-1">Avg Rating</div>
                </div>
                <FaStar className="text-4xl opacity-30" />
              </div>
            </div>
          </div>
        )}

        {/* ========== ACTION BUTTONS ========== */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/add-property" className="btn btn-primary gap-2">
            <FaPlus /> Add Property
          </Link>
          <Link to="/favorites" className="btn btn-ghost gap-2">
            <FaHeart /> My Favorites
          </Link>
          {properties.length > 0 && (
            <button onClick={handleExportCSV} className="btn btn-ghost gap-2">
              <FaFileExport /> Export to CSV
            </button>
          )}
        </div>

        {/* ========== PROPERTIES LIST ========== */}
        {properties.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-xl shadow border border-base-200 max-w-2xl mx-auto">
            <div className="text-5xl mb-4 text-base-content/50">🏠</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No Properties Yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Start by adding your first property
            </p>
            <Link to="/add-property" className="btn btn-primary gap-2">
              <FaPlus /> Add Property
            </Link>
          </div>
        ) : (
          <div className="bg-base-100 rounded-xl shadow border border-base-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-base-200 text-base-content">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Location</th>
                    <th className="p-4 text-center">Rating</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {properties.map((p) => (
                    <tr key={p._id} className="hover:bg-base-200 transition">
                      <td className="p-4">
                        <img
                          src={
                            p.imageURL ||
                            "https://placehold.co/150?text=Property"
                          }
                          alt={p.name}
                          loading="lazy"
                          decoding="async"
                          className="h-16 w-24 object-cover rounded-lg"
                          onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/150?text=Property")
                          }
                        />
                      </td>
                      <td className="p-4 font-medium text-base-content max-w-xs truncate">
                        {p.name}
                      </td>
                      <td className="p-4">
                        <span className="badge badge-primary">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-base-content">
                        ${p.price?.toLocaleString()}
                      </td>
                      <td className="p-4 text-base-content/80 max-w-xs truncate">
                        {p.location}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaStar className="text-warning text-sm" />
                          <span className="font-semibold">
                            {p.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/property/${p._id}`}
                            className="btn btn-sm btn-primary"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/update-property/${p._id}`}
                            className="btn btn-sm btn-secondary"
                            title="Edit Property"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="btn btn-sm btn-error"
                            title="Delete Property"
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
                      src={
                        p.imageURL || "https://placehold.co/150?text=Property"
                      }
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="h-24 w-32 object-cover rounded-lg flex-shrink-0"
                      onError={(e) =>
                        (e.target.src =
                          "https://placehold.co/150?text=Property")
                      }
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base-content mb-1 truncate">
                        {p.name}
                      </h3>
                      <p className="text-sm text-base-content/70 mb-1 truncate">
                        {p.location}
                      </p>
                      <p className="font-bold text-base-content">
                        ${p.price?.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="badge badge-primary badge-sm">
                          {p.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-warning text-xs" />
                          <span className="text-xs font-semibold">
                            {p.rating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Link
                      to={`/property/${p._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FaEye className="mr-1" /> View
                    </Link>
                    <Link
                      to={`/update-property/${p._id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash className="mr-1" /> Delete
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
