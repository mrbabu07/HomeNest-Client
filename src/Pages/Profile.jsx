// import React, { useState, useContext } from "react";
// import AuthContext from "../Context/AuthContext";
// import { Navigate } from "react-router";
// import { updateProfile } from "firebase/auth";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     displayName: user?.displayName || "",
//     photoURL: user?.photoURL || "",
//   });
//   const [updating, setUpdating] = useState(false);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-xl text-white">
//         Loading your profile...
//       </div>
//     );
//   }

//   // If not logged in
//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   const fallbackPhoto = "https://i.postimg.cc/7Zk0qR2v/dog-winter-coat.jpg";

//   // Input change handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Update profile handler
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setUpdating(true);

//     try {
//       // Firebase updateProfile
//       await updateProfile(user, {
//         displayName: formData.displayName,
//         photoURL: formData.photoURL,
//       });

//       toast.success("Profile updated successfully!");
//       setIsEditing(false);

//       // Refresh page to show updated info
//       window.location.reload();
//     } catch (error) {
//       console.error("Profile update error:", error);
//       toast.error(error.message || "Failed to update profile");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // Cancel editing
//   const handleCancel = () => {
//     setFormData({
//       displayName: user?.displayName || "",
//       photoURL: user?.photoURL || "",
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl mt-10 border border-gray-700">
//       <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

//       {/* Profile Photo */}
//       <div className="text-center mb-6">
//         <img
//           src={isEditing && formData.photoURL ? formData.photoURL : user?.photoURL || fallbackPhoto}
//           alt="Profile"
//           className="w-24 h-24 rounded-full mx-auto border-2 border-gray-600 object-cover"
//           onError={(e) => { e.target.src = fallbackPhoto; }}
//         />
//       </div>

//       {/* View Mode */}
//       {!isEditing ? (
//         <>
//           <div className="space-y-3 text-left">
//             <p>
//               <span className="text-gray-400">Name:</span>{" "}
//               <span className="ml-2 font-medium">{user?.displayName || "Not set"}</span>
//             </p>
//             <p>
//               <span className="text-gray-400">Email:</span>{" "}
//               <span className="ml-2 font-medium">{user?.email || "No email"}</span>
//             </p>
//           </div>

//           <button
//             onClick={() => setIsEditing(true)}
//             className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
//           >
//             Update Profile
//           </button>
//         </>
//       ) : (
//         // Edit Mode
//         <form onSubmit={handleUpdateProfile} className="space-y-4">
//           <div>
//             <label className="block text-gray-400 mb-1 text-sm">Name</label>
//             <input
//               type="text"
//               name="displayName"
//               value={formData.displayName}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-400 mb-1 text-sm">Photo URL</label>
//             <input
//               type="url"
//               name="photoURL"
//               value={formData.photoURL}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Upload photo URL"
//             />
//           </div>

//           {/*
//           <div>
//             <label className="block text-gray-400 mb-1 text-sm">Email</label>
//             <input
//               type="email"
//               value={user?.email || ""}
//               className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
//               disabled
//             />
//             <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
//           </div>
//           */}

//           <div className="flex gap-3 mt-6">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
//               disabled={updating}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
//               disabled={updating}
//             >
//               {updating ? "Updating..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Profile;

// src/Pages/Profile.jsx - Enhanced Profile Page with Edit Functionality
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  
  FaStar,
  FaHeart,
  FaEye,
  FaAward,
  FaCheckCircle,
  FaShieldAlt,
  FaCrown,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    phone: "",
    location: "",
    bio: "",
    joinDate: "",
  });
  const [userStats, setUserStats] = useState({
    totalProperties: 0,
    totalReviews: 0,
    averageRating: 0,
    totalViews: 0,
    totalFavorites: 0,
    verified: false,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) {
      loadProfileData();
      fetchUserStats();
      fetchRecentActivity();
    }
  }, [user]);

  const loadProfileData = () => {
    setProfileData({
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      phone: user.phone || "",
      location: user.location || "",
      bio: user.bio || "",
      joinDate: user.metadata?.creationTime || new Date().toISOString(),
    });
  };

  const fetchUserStats = async () => {
    try {
      setStatsLoading(true);

      // Fetch user's properties
      const propertiesResponse = await axios.get(
        `http://localhost:3000/myServices?email=${user.email}`
      );
      const userProperties = propertiesResponse.data || [];

      // Fetch user's reviews
      const reviewsResponse = await axios.get(
        `http://localhost:3000/reviewsByUser/${user.email}`
      );
      const userReviews = reviewsResponse.data || [];

      // Calculate stats
      const totalProperties = userProperties.length;
      const totalReviews = userReviews.length;

      // Calculate average rating
      const propertiesWithRating = userProperties.filter(p => p.rating && p.rating > 0);
      const averageRating = propertiesWithRating.length > 0
        ? (propertiesWithRating.reduce((sum, p) => sum + p.rating, 0) / propertiesWithRating.length)
        : 0;

      // Simulate views and favorites
      const totalViews = userProperties.reduce(
        (sum, p) => sum + (p.views || Math.floor(Math.random() * 500)),
        0
      );
      const totalFavorites = userProperties.reduce(
        (sum, p) => sum + (p.favorites || Math.floor(Math.random() * 50)),
        0
      );

      setUserStats({
        totalProperties,
        totalReviews,
        averageRating: averageRating.toFixed(1),
        totalViews,
        totalFavorites,
        verified: totalProperties >= 5 || averageRating >= 4.5,
      });

      setStatsLoading(false);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      setStatsLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const propertiesResponse = await axios.get(
        `http://localhost:3000/myServices?email=${user.email}`
      );
      const userProperties = propertiesResponse.data || [];

      const activities = userProperties
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 5)
        .map(p => ({
          id: p._id,
          type: "property",
          title: `Posted "${p.name}"`,
          date: p.postedDate,
          icon: <FaHouse />,
        }));

      setRecentActivity(activities);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // You can add backend API call here to save additional fields
      // await axios.put(`http://localhost:3000/api/users/${user.email}`, profileData);

      toast.success("Profile updated successfully!");
      setEditing(false);
      
      // Update context
      if (setUser) {
        setUser({ ...user, ...profileData });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    loadProfileData();
    setEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statCards = [
    {
      title: "Properties",
      value: userStats.totalProperties,
      icon: <FaHouse className="text-2xl" />,
      color: "bg-primary",
      textColor: "text-primary-content",
    },
    {
      title: "Reviews",
      value: userStats.totalReviews,
      icon: <FaStar className="text-2xl" />,
      color: "bg-secondary",
      textColor: "text-secondary-content",
    },
    {
      title: "Avg Rating",
      value: userStats.averageRating || "N/A",
      icon: <FaAward className="text-2xl" />,
      color: "bg-accent",
      textColor: "text-accent-content",
    },
    {
      title: "Total Views",
      value: userStats.totalViews.toLocaleString(),
      icon: <FaEye className="text-2xl" />,
      color: "bg-info",
      textColor: "text-info-content",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Cover Photo */}
        <div className="relative mb-8">
          <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-2xl"></div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <img
                src={profileData.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-base-100 object-cover shadow-xl"
              />
              {userStats.verified && (
                <div className="absolute bottom-0 right-0 bg-success text-success-content rounded-full p-2 border-2 border-base-100">
                  <FaCheckCircle className="text-xl" />
                </div>
              )}
              {editing && (
                <button className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary">
                  <FaCamera />
                </button>
              )}
            </div>
          </div>
          <div className="absolute top-4 right-4">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary gap-2"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn btn-success gap-2"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <FaSave />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="btn btn-ghost gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-20 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-base-content">
              {profileData.displayName || "User"}
            </h1>
            {userStats.verified && (
              <div className="tooltip tooltip-right" data-tip="Verified User">
                <FaShieldAlt className="text-success text-2xl" />
              </div>
            )}
            {userStats.totalProperties >= 10 && (
              <div className="tooltip tooltip-right" data-tip="Top Contributor">
                <FaCrown className="text-warning text-2xl" />
              </div>
            )}
          </div>
          <p className="text-base-content/70 flex items-center gap-2">
            <FaEnvelope className="text-sm" />
            {profileData.email}
          </p>
          <p className="text-base-content/60 text-sm flex items-center gap-2 mt-1">
            <FaCalendar className="text-xs" />
            Joined {formatDate(profileData.joinDate)}
          </p>
        </div>

        {/* Stats Cards */}
        {statsLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className={`card ${stat.color} ${stat.textColor} shadow-lg`}
              >
                <div className="card-body p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-80">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="opacity-80">{stat.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4 flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Personal Information
                </h2>

                <div className="space-y-4">
                  {/* Display Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Full Name</span>
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="displayName"
                        value={profileData.displayName}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-base-content/80 pl-4">
                        {profileData.displayName || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Email (Read-only) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <p className="text-base-content/80 pl-4 flex items-center gap-2">
                      <FaEnvelope className="text-primary" />
                      {profileData.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Phone</span>
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-base-content/80 pl-4 flex items-center gap-2">
                        <FaPhone className="text-primary" />
                        {profileData.phone || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        placeholder="City, Country"
                      />
                    ) : (
                      <p className="text-base-content/80 pl-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        {profileData.location || "Not provided"}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Bio</span>
                    </label>
                    {editing ? (
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered h-24"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    ) : (
                      <p className="text-base-content/80 pl-4">
                        {profileData.bio || "No bio provided"}
                      </p>
                    )}
                  </div>

                  {/* Photo URL */}
                  {editing && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Profile Photo URL
                        </span>
                      </label>
                      <input
                        type="url"
                        name="photoURL"
                        value={profileData.photoURL}
                        onChange={handleInputChange}
                        className="input input-bordered"
                        placeholder="Enter image URL"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Recent Activity</h2>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                      >
                        <div className="p-2 bg-primary/20 text-primary rounded-lg">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-base-content/60">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-base-content/50">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links & Achievements */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    className="btn btn-outline btn-block justify-start gap-2"
                  >
                    <FaHouse />
                    Dashboard
                  </Link>
                  <Link
                    to="/my-properties"
                    className="btn btn-outline btn-block justify-start gap-2"
                  >
                    <FaHouse />
                    My Properties
                  </Link>
                  <Link
                    to="/my-ratings"
                    className="btn btn-outline btn-block justify-start gap-2"
                  >
                    <FaStar />
                    My Reviews
                  </Link>
                  <Link
                    to="/favorites"
                    className="btn btn-outline btn-block justify-start gap-2"
                  >
                    <FaHeart />
                    Favorites
                  </Link>
                  <Link
                    to="/settings"
                    className="btn btn-outline btn-block justify-start gap-2"
                  >
                    <FaUser />
                    Settings
                  </Link>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Achievements</h2>
                <div className="space-y-3">
                  {userStats.verified && (
                    <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                      <FaShieldAlt className="text-success text-2xl" />
                      <div>
                        <p className="font-semibold text-success">Verified User</p>
                        <p className="text-xs text-base-content/60">
                          Trusted by community
                        </p>
                      </div>
                    </div>
                  )}
                  {userStats.totalProperties >= 5 && (
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <FaHouse className="text-primary text-2xl" />
                      <div>
                        <p className="font-semibold text-primary">Active Lister</p>
                        <p className="text-xs text-base-content/60">
                          5+ properties listed
                        </p>
                      </div>
                    </div>
                  )}
                  {userStats.averageRating >= 4.5 && (
                    <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                      <FaStar className="text-warning text-2xl" />
                      <div>
                        <p className="font-semibold text-warning">Top Rated</p>
                        <p className="text-xs text-base-content/60">
                          4.5+ avg rating
                        </p>
                      </div>
                    </div>
                  )}
                  {userStats.totalProperties >= 10 && (
                    <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                      <FaCrown className="text-accent text-2xl" />
                      <div>
                        <p className="font-semibold text-accent">Elite Member</p>
                        <p className="text-xs text-base-content/60">
                          10+ properties
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;