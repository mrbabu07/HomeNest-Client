// src/Pages/Settings.jsx
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaLock,
  FaEnvelope,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaTrash,
  FaSave,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaExclamationTriangle,
  FaUserShield,
  FaKey,
  FaCog,
} from "react-icons/fa";
import {
  Shield,
  Bell,
  Palette,
  Trash2,
  Settings as SettingsIcon,
} from "lucide-react";

const Settings = () => {
  const { user, updateUserPassword, updateUserEmail, deleteAccount } =
    useContext(AuthContext);

  // Active tab state
  const [activeTab, setActiveTab] = useState("security");

  // Security settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  // Email settings
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    propertyUpdates: true,
    reviewNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    priceAlerts: true,
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLastActive: true,
    allowMessages: true,
  });
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  // Theme settings
  const [theme, setTheme] = useState("light");

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedNotifications = localStorage.getItem("notifications");
    const savedPrivacy = localStorage.getItem("privacy");

    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.error("Error parsing notifications:", e);
      }
    }

    if (savedPrivacy) {
      try {
        setPrivacy(JSON.parse(savedPrivacy));
      } catch (e) {
        console.error("Error parsing privacy:", e);
      }
    }
  }, []);

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("All password fields are required");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    try {
      setChangingPassword(true);

      // Call Firebase updatePassword function
      if (updateUserPassword) {
        await updateUserPassword(passwordData.newPassword);
      }

      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Password change error:", error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before changing password");
      } else {
        toast.error(error.message || "Failed to change password");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // Handle email change
  const handleEmailChange = async (e) => {
    e.preventDefault();

    if (!newEmail || !emailPassword) {
      toast.error("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (newEmail === user.email) {
      toast.error("New email must be different from current email");
      return;
    }

    const result = await Swal.fire({
      title: "Change Email?",
      text: `Your email will be changed to ${newEmail}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, change it",
    });

    if (!result.isConfirmed) return;

    try {
      setChangingEmail(true);

      // Call Firebase updateEmail function
      if (updateUserEmail) {
        await updateUserEmail(newEmail);
      }

      toast.success(
        "Email changed successfully! Please verify your new email."
      );
      setNewEmail("");
      setEmailPassword("");
    } catch (error) {
      console.error("Email change error:", error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before changing email");
      } else {
        toast.error(error.message || "Failed to change email");
      }
    } finally {
      setChangingEmail(false);
    }
  };

  // Handle notification toggle
  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save notification settings
  const handleSaveNotifications = () => {
    setSavingNotifications(true);
    setTimeout(() => {
      localStorage.setItem("notifications", JSON.stringify(notifications));
      toast.success("Notification preferences saved!");
      setSavingNotifications(false);
    }, 500);
  };

  // Handle privacy toggle
  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Save privacy settings
  const handleSavePrivacy = () => {
    setSavingPrivacy(true);
    setTimeout(() => {
      localStorage.setItem("privacy", JSON.stringify(privacy));
      toast.success("Privacy settings saved!");
      setSavingPrivacy(false);
    }, 500);
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      html: `
        <p>This action cannot be undone. All your data will be permanently deleted:</p>
        <ul style="text-align: left; margin-top: 10px;">
          <li>All property listings</li>
          <li>All reviews and ratings</li>
          <li>Profile information</li>
          <li>Account credentials</li>
        </ul>
      `,
      icon: "warning",
      input: "text",
      inputPlaceholder: "Type DELETE to confirm",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete Account",
      inputValidator: (value) => {
        if (value !== "DELETE") {
          return "Please type DELETE to confirm";
        }
      },
    });

    if (!result.isConfirmed) return;

    try {
      // Delete user's properties
      const propertiesRes = await axios.get(
        `https://home-nest-server-10.vercel.app/myServices?email=${user.email}`
      );
      const properties = propertiesRes.data || [];

      for (const property of properties) {
        await axios.delete(
          `https://home-nest-server-10.vercel.app/deleteService/${property._id}`
        );
      }

      // Delete Firebase account
      if (deleteAccount) {
        await deleteAccount();
      }

      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Account deletion error:", error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("Please log out and log in again before deleting account");
      } else {
        toast.error("Failed to delete account");
      }
    }
  };

  // Tabs configuration
  const tabs = [
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Privacy", icon: <FaUserShield /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "danger", label: "Danger Zone", icon: <FaExclamationTriangle /> },
  ];

  return (
    <div className="min-h-screen bg-base-100 py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary p-3 rounded-lg">
              <FaCog className="text-2xl text-primary-content" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">Settings</h1>
              <p className="text-base-content/70">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-2">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FaLock className="text-xl text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-base-content">
                        Change Password
                      </h2>
                      <p className="text-sm text-base-content/70">
                        Update your password regularly for security
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    {/* Current Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Current Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              currentPassword: e.target.value,
                            }))
                          }
                          className="input input-bordered w-full pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                        >
                          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          New Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          className="input input-bordered w-full pr-10"
                          placeholder="Enter new password (min. 6 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Confirm New Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="input input-bordered w-full pr-10"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={changingPassword}
                      className="btn btn-primary gap-2"
                    >
                      {changingPassword ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                      Change Password
                    </button>
                  </form>
                </div>

                {/* Change Email */}
                <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-success/10 p-3 rounded-lg">
                      <FaEnvelope className="text-xl text-success" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-base-content">
                        Change Email Address
                      </h2>
                      <p className="text-sm text-base-content/70">
                        Current email:{" "}
                        <span className="font-medium">{user?.email}</span>
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleEmailChange} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          New Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter new email address"
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Confirm Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showEmailPassword ? "text" : "password"}
                          value={emailPassword}
                          onChange={(e) => setEmailPassword(e.target.value)}
                          className="input input-bordered w-full pr-10"
                          placeholder="Enter your password to confirm"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowEmailPassword(!showEmailPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                        >
                          {showEmailPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={changingEmail}
                      className="btn btn-success gap-2"
                    >
                      {changingEmail ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                      Change Email
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-warning/10 p-3 rounded-lg">
                    <FaBell className="text-xl text-warning" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-base-content">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-base-content/70">
                      Choose what notifications you want to receive
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.emailNotifications}
                      onChange={() =>
                        handleNotificationChange("emailNotifications")
                      }
                    />
                  </div>

                  {/* Property Updates */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Property Updates
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Get notified about your property status changes
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.propertyUpdates}
                      onChange={() =>
                        handleNotificationChange("propertyUpdates")
                      }
                    />
                  </div>

                  {/* Review Notifications */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Review Notifications
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Be notified when someone reviews your property
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.reviewNotifications}
                      onChange={() =>
                        handleNotificationChange("reviewNotifications")
                      }
                    />
                  </div>

                  {/* Marketing Emails */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Receive promotional offers and updates
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.marketingEmails}
                      onChange={() =>
                        handleNotificationChange("marketingEmails")
                      }
                    />
                  </div>

                  {/* Weekly Digest */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Weekly Digest
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Get a weekly summary of your activities
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.weeklyDigest}
                      onChange={() => handleNotificationChange("weeklyDigest")}
                    />
                  </div>

                  {/* Price Alerts */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Price Alerts
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Get notified about price changes in your area
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.priceAlerts}
                      onChange={() => handleNotificationChange("priceAlerts")}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveNotifications}
                  disabled={savingNotifications}
                  className="btn btn-primary gap-2 mt-6"
                >
                  {savingNotifications ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}
                  Save Preferences
                </button>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-info/10 p-3 rounded-lg">
                    <FaShieldAlt className="text-xl text-info" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-base-content">
                      Privacy Settings
                    </h2>
                    <p className="text-sm text-base-content/70">
                      Control your privacy and data sharing
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Profile Visibility */}
                  <div className="p-4 bg-base-200 rounded-lg">
                    <h3 className="font-semibold text-base-content mb-3">
                      Profile Visibility
                    </h3>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) =>
                        handlePrivacyChange("profileVisibility", e.target.value)
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="public">Public - Anyone can see</option>
                      <option value="members">Members Only</option>
                      <option value="private">Private - Only me</option>
                    </select>
                  </div>

                  {/* Show Email */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Show Email
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Display your email on your public profile
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={privacy.showEmail}
                      onChange={(e) =>
                        handlePrivacyChange("showEmail", e.target.checked)
                      }
                    />
                  </div>

                  {/* Show Phone */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Show Phone
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Display your phone number on your profile
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={privacy.showPhone}
                      onChange={(e) =>
                        handlePrivacyChange("showPhone", e.target.checked)
                      }
                    />
                  </div>

                  {/* Show Last Active */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Show Last Active
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Let others see when you were last active
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={privacy.showLastActive}
                      onChange={(e) =>
                        handlePrivacyChange("showLastActive", e.target.checked)
                      }
                    />
                  </div>

                  {/* Allow Messages */}
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-base-content">
                        Allow Messages
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Allow other users to send you messages
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={privacy.allowMessages}
                      onChange={(e) =>
                        handlePrivacyChange("allowMessages", e.target.checked)
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={handleSavePrivacy}
                  disabled={savingPrivacy}
                  className="btn btn-primary gap-2 mt-6"
                >
                  {savingPrivacy ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}
                  Save Settings
                </button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <FaPalette className="text-xl text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-base-content">
                      Appearance Settings
                    </h2>
                    <p className="text-sm text-base-content/70">
                      Customize how HomeNest looks to you
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-base-content mb-4">
                      Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Light Theme */}
                      <button
                        onClick={() => handleThemeChange("light")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-base-300 hover:border-base-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-400 p-3 rounded-lg">
                            <FaSun className="text-2xl text-yellow-900" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-base-content">
                              Light Mode
                            </h4>
                            <p className="text-sm text-base-content/70">
                              Bright and clean interface
                            </p>
                          </div>
                          {theme === "light" && (
                            <FaCheckCircle className="text-primary text-xl ml-auto" />
                          )}
                        </div>
                      </button>

                      {/* Dark Theme */}
                      <button
                        onClick={() => handleThemeChange("dark")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-base-300 hover:border-base-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-700 p-3 rounded-lg">
                            <FaMoon className="text-2xl text-slate-200" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-base-content">
                              Dark Mode
                            </h4>
                            <p className="text-sm text-base-content/70">
                              Easy on the eyes
                            </p>
                          </div>
                          {theme === "dark" && (
                            <FaCheckCircle className="text-primary text-xl ml-auto" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Theme Preview */}
                  <div className="bg-base-200 p-6 rounded-lg">
                    <h3 className="font-semibold text-base-content mb-3">
                      Preview
                    </h3>
                    <div className="bg-base-100 p-4 rounded-lg border border-base-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary rounded-full"></div>
                        <div>
                          <div className="h-3 w-24 bg-base-content/20 rounded mb-2"></div>
                          <div className="h-2 w-32 bg-base-content/10 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-base-content/10 rounded"></div>
                        <div className="h-2 w-5/6 bg-base-content/10 rounded"></div>
                        <div className="h-2 w-4/6 bg-base-content/10 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Settings */}
                  <div className="alert alert-info">
                    <FaCheckCircle />
                    <span>Your theme preference is saved automatically</span>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === "danger" && (
              <div className="bg-base-100 rounded-xl shadow-lg border-2 border-error p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-error/10 p-3 rounded-lg">
                    <FaExclamationTriangle className="text-xl text-error" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-error">
                      Danger Zone
                    </h2>
                    <p className="text-sm text-base-content/70">
                      Irreversible actions - proceed with caution
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Account Information */}
                  <div className="bg-error/5 p-4 rounded-lg border border-error/20">
                    <h3 className="font-semibold text-base-content mb-2">
                      Account Information
                    </h3>
                    <div className="space-y-2 text-sm text-base-content/70">
                      <p>• Email: {user?.email}</p>
                      <p>
                        • Account created:{" "}
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p>
                        • Email verified:{" "}
                        {user?.emailVerified ? (
                          <span className="text-success font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="text-error font-semibold">No</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Delete Account Section */}
                  <div className="bg-error/5 p-6 rounded-lg border-2 border-error/30">
                    <div className="flex items-start gap-3 mb-4">
                      <Trash2 className="text-error text-2xl flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-bold text-error mb-2">
                          Delete Account
                        </h3>
                        <p className="text-sm text-base-content/80 mb-4">
                          Once you delete your account, there is no going back.
                          Please be certain.
                        </p>
                        <div className="space-y-2 text-sm text-base-content/70 mb-4">
                          <p className="font-semibold text-base-content">
                            This will permanently delete:
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>All your property listings</li>
                            <li>All reviews and ratings you've given</li>
                            <li>Your profile and personal information</li>
                            <li>Your account credentials and access</li>
                            <li>All associated data and preferences</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-error mb-4">
                      <FaExclamationTriangle />
                      <span className="text-sm">
                        <strong>Warning:</strong> This action cannot be undone.
                        All your data will be permanently lost.
                      </span>
                    </div>

                    <button
                      onClick={handleDeleteAccount}
                      className="btn btn-error gap-2"
                    >
                      <FaTrash />
                      Delete My Account
                    </button>
                  </div>

                  {/* Additional Warning */}
                  <div className="bg-warning/10 p-4 rounded-lg border border-warning/30">
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle className="text-warning text-xl flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-base-content/80">
                        <p className="font-semibold text-base-content mb-1">
                          Before you delete your account:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Download any data you want to keep</li>
                          <li>Cancel any active subscriptions</li>
                          <li>Remove your payment methods</li>
                          <li>Export your property listings if needed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
