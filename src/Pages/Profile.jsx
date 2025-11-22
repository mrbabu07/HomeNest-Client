import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Navigate } from "react-router";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [updating, setUpdating] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-white">
        Loading your profile...
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const fallbackPhoto = "https://i.postimg.cc/7Zk0qR2v/dog-winter-coat.jpg";

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // Firebase updateProfile
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Refresh page to show updated info
      window.location.reload();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl mt-10 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      {/* Profile Photo */}
      <div className="text-center mb-6">
        <img
          src={isEditing && formData.photoURL ? formData.photoURL : user?.photoURL || fallbackPhoto}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-gray-600 object-cover"
          onError={(e) => { e.target.src = fallbackPhoto; }}
        />
      </div>

      {/* View Mode */}
      {!isEditing ? (
        <>
          <div className="space-y-3 text-left">
            <p>
              <span className="text-gray-400">Name:</span>{" "}
              <span className="ml-2 font-medium">{user?.displayName || "Not set"}</span>
            </p>
            <p>
              <span className="text-gray-400">Email:</span>{" "}
              <span className="ml-2 font-medium">{user?.email || "No email"}</span>
            </p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full mt-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
          >
            Update Profile
          </button>
        </>
      ) : (
        // Edit Mode
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Name</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1 text-sm">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Upload photo URL"
            />
          </div>

          {/*
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-400 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>
          */}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={updating}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
