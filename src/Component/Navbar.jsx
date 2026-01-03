// // src/Component/Navbar.jsx
// import React, { useState, useContext, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";
// import { signOut } from "firebase/auth";
// import { auth } from "../Firebase/Firebase.config";
// import { toast } from "react-toastify";
// import {
//   Home,
//   MapPin,
//   Plus,
//   User,
//   Star,
//   LogOut,
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   Building,
// } from "lucide-react";
// import { FaHeart } from "react-icons/fa";

// const Navbar = () => {
//   const { user, loading } = useContext(AuthContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("theme") || "light";
//     setDarkMode(saved === "dark");
//     document.documentElement.setAttribute("data-theme", saved);
//   }, []);

//   const switchTheme = () => {
//     const newTheme = darkMode ? "light" : "dark";
//     setDarkMode(!darkMode);
//     document.documentElement.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Successfully logged out!");
//       setUserDropdownOpen(false);
//     } catch (error) {
//       toast.error("Error logging out: " + error.message);
//     }
//   };

//   const navLinkStyle = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//       isActive
//         ? "bg-primary text-primary-content"
//         : "text-base-content hover:bg-base-200 hover:text-primary"
//     }`;

//   if (loading) {
//     return (
//       <div className="h-16 bg-base-100 border-b border-base-200 animate-pulse"></div>
//     );
//   }

//   return (
//     <nav className="bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-3 group">
//             <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
//               <Building className="text-primary-content" size={24} />
//             </div>
//             <span className="text-2xl font-bold text-primary group-hover:opacity-80 transition-opacity">
//               HomeNest
//             </span>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-1">
//             <NavLink to="/" className={navLinkStyle} end>
//               <Home size={18} /> Home
//             </NavLink>
//             <NavLink to="/properties" className={navLinkStyle}>
//               <MapPin size={18} /> All Properties
//             </NavLink>
//             {user && (
//               <>
//                 <NavLink to="/add-property" className={navLinkStyle}>
//                   <Plus size={18} /> Add Property
//                 </NavLink>
//                 <NavLink to="/my-properties" className={navLinkStyle}>
//                   <User size={18} /> My Properties
//                 </NavLink>
//                 <NavLink to="/my-ratings" className={navLinkStyle}>
//                   <Star size={18} /> My Ratings
//                 </NavLink>
//               </>
//             )}
//           </div>

//           {/* Desktop Right */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* Theme Toggle */}
//             <button
//               onClick={switchTheme}
//               className="p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300 transition-all"
//               aria-label="Toggle theme"
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>

//             {/* User/Auth */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setUserDropdownOpen(!userDropdownOpen)}
//                   className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200"
//                 >
//                   <img
//                     src={
//                       user.photoURL ||
//                       "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                     }
//                     alt="Avatar"
//                     className="w-8 h-8 rounded-full border-2 border-primary"
//                   />
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       userDropdownOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {userDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-2xl border border-base-200 z-20">
//                     <div className="p-4 border-b border-base-200">
//                       <p className="font-semibold text-base-content truncate">
//                         {user.displayName || "User"}
//                       </p>
//                       <p className="text-sm text-base-content/70 truncate">
//                         {user.email}
//                       </p>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-left text-error hover:bg-error/10"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex space-x-3">
//                 <Link
//                   to="/login"
//                   className="px-6 py-2 text-primary font-medium hover:opacity-80"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-6 py-2 bg-primary text-primary-content rounded-lg font-medium hover:opacity-90 transition"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-base-100 rounded-2xl shadow-2xl border border-base-200 mt-2 mb-4">
//             <div className="p-4 space-y-2">
//               <NavLink
//                 to="/"
//                 className={navLinkStyle}
//                 onClick={() => setMobileMenuOpen(false)}
//                 end
//               >
//                 <Home size={18} /> Home
//               </NavLink>
//               <NavLink
//                 to="/properties"
//                 className={navLinkStyle}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <MapPin size={18} /> All Properties
//               </NavLink>
//               {user && (
//                 <>
//                   <NavLink
//                     to="/add-property"
//                     className={navLinkStyle}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Plus size={18} /> Add Property
//                   </NavLink>
//                   <NavLink
//                     to="/my-properties"
//                     className={navLinkStyle}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <User size={18} /> My Properties
//                   </NavLink>
//                   <NavLink
//                     to="/my-ratings"
//                     className={navLinkStyle}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     <Star size={18} /> My Ratings
//                   </NavLink>
//                   <>
//                 <NavLink to="/favorites" className={navLinkStyle}>
//                   <FaHeart size={18} /> Favorites
//                 </NavLink>
                
//               </>
//                 </>
//               )}
//             </div>
            

//             <div className="p-4 border-t border-base-200 space-y-4">
//               <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
//                 <span className="font-medium">Theme</span>
//                 <button
//                   onClick={switchTheme}
//                   className="p-2 rounded-lg bg-base-100"
//                 >
//                   {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//                 </button>
//               </div>

//               {user ? (
//                 <div className="space-y-3">
//                   <div className="p-3 bg-base-200 rounded-lg">
//                     <p className="font-semibold text-base-content truncate">
//                       {user.displayName || user.email}
//                     </p>
//                     <p className="text-sm text-base-content/70 truncate">
//                       {user.email}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       handleLogout();
//                     }}
//                     className="w-full flex items-center justify-center gap-2 py-3 bg-error text-error-content rounded-lg font-medium hover:opacity-90"
//                   >
//                     <LogOut size={18} /> Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-3">
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="w-full text-center py-3 text-primary font-medium"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="w-full text-center py-3 bg-primary text-primary-content rounded-lg font-medium"
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






// src/Component/Navbar.jsx
// src/Component/Navbar.jsx
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Home,
  MapPin,
  Plus,
  User,
  Star,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Building,
  Bell,
  BellDot,
  Trash2,
  Check,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  // ✅ Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setDarkMode(saved === "dark");
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // ✅ Fetch real notifications from backend
  useEffect(() => {
    if (user?.email) {
      fetchNotifications();
      // Optional: Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user?.email) return;
    
    try {
      setNotificationsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/notifications?email=${user.email}`
      );
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Don't show error toast to avoid annoying users
    } finally {
      setNotificationsLoading(false);
    }
  };

  const switchTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully logged out!");
      setUserDropdownOpen(false);
      setNotifications([]);
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  // ✅ Mark notification as read (backend update)
  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id || n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // ✅ Mark all as read (backend update)
  const markAllAsRead = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/notifications/mark-all-read`, {
        email: user.email,
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      toast.success("All marked as read");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all as read");
    }
  };

  // ✅ Delete notification (backend delete)
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id && n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  // ✅ Clear all notifications (backend delete)
  const clearAllNotifications = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/notifications/clear-all`, {
        params: { email: user.email },
      });
      setNotifications([]);
      toast.success("All notifications cleared");
    } catch (error) {
      console.error("Error clearing notifications:", error);
      toast.error("Failed to clear notifications");
    }
  };

  // ✅ Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ Format time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  // ✅ Handle notification click (navigate if has propertyId)
  const handleNotificationClick = (notification) => {
    markAsRead(notification._id || notification.id);
    
    // If notification has propertyId, navigate to that property
    if (notification.propertyId) {
      window.location.href = `/property/${notification.propertyId}`;
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-content"
        : "text-base-content hover:bg-base-200 hover:text-primary"
    }`;

  if (loading) {
    return (
      <div className="h-16 bg-base-100 border-b border-base-200 animate-pulse"></div>
    );
  }

  return (
    <nav className="bg-base-100 shadow-sm border-b border-base-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ========== LOGO ========== */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
              <Building className="text-primary-content" size={24} />
            </div>
            <span className="text-2xl font-bold text-primary group-hover:opacity-80 transition-opacity">
              HomeNest
            </span>
          </Link>

          {/* ========== DESKTOP NAVIGATION ========== */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkStyle} end>
              <Home size={18} /> Home
            </NavLink>
            <NavLink to="/properties" className={navLinkStyle}>
              <MapPin size={18} /> All Properties
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-property" className={navLinkStyle}>
                  <Plus size={18} /> Add Property
                </NavLink>
                <NavLink to="/my-properties" className={navLinkStyle}>
                  <User size={18} /> My Properties
                </NavLink>
                <NavLink to="/my-ratings" className={navLinkStyle}>
                  <Star size={18} /> My Ratings
                </NavLink>
                <NavLink to="/favorites" className={navLinkStyle}>
                  <FaHeart size={18} /> Favorites
                </NavLink>
              </>
            )}
          </div>

          {/* ========== DESKTOP RIGHT SIDE ========== */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={switchTheme}
              className="p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* ========== NOTIFICATION BELL ========== */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationDropdownOpen(!notificationDropdownOpen);
                    setUserDropdownOpen(false);
                  }}
                  className="relative p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300 transition-all"
                  aria-label="Notifications"
                >
                  {unreadCount > 0 ? (
                    <BellDot size={20} className="text-primary" />
                  ) : (
                    <Bell size={20} />
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-error rounded-full">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-xl shadow-2xl border border-base-200 z-20 max-h-96 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-base-200 flex items-center justify-between">
                      <h3 className="font-bold text-base-content">
                        Notifications ({unreadCount})
                      </h3>
                      {notifications.length > 0 && (
                        <div className="flex gap-2">
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-primary hover:underline"
                              title="Mark all as read"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-error hover:underline"
                            title="Clear all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1">
                      {notificationsLoading ? (
                        <div className="p-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell size={48} className="mx-auto text-base-content/30 mb-3" />
                          <p className="text-base-content/70 text-sm">
                            No notifications yet
                          </p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id || notification.id}
                            className={`p-4 border-b border-base-200 hover:bg-base-200 transition-colors cursor-pointer relative ${
                              !notification.read ? "bg-primary/5" : ""
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                {/* Notification Type Badge */}
                                {notification.type && (
                                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary mb-1">
                                    {notification.type}
                                  </span>
                                )}
                                <p className="text-sm text-base-content line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-base-content/60 mt-1">
                                  {timeAgo(notification.timestamp || notification.time)}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification._id || notification.id);
                                }}
                                className="text-error hover:bg-error/10 p-1 rounded"
                                title="Delete"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full absolute left-2 top-1/2 -translate-y-1/2" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setNotificationDropdownOpen(false);
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200"
                >
                  <img
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-2xl border border-base-200 z-20">
                    <div className="p-4 border-b border-base-200">
                      <p className="font-semibold text-base-content truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm text-base-content/70 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-error hover:bg-error/10"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-primary font-medium hover:opacity-80"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-primary text-primary-content rounded-lg font-medium hover:opacity-90 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* ========== MOBILE MENU TOGGLE ========== */}
          <button
            className="md:hidden p-2 rounded-lg bg-base-200 text-base-content hover:bg-base-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ========== MOBILE MENU ========== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-base-100 rounded-2xl shadow-2xl border border-base-200 mt-2 mb-4">
            <div className="p-4 space-y-2">
              <NavLink
                to="/"
                className={navLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
                end
              >
                <Home size={18} /> Home
              </NavLink>
              <NavLink
                to="/properties"
                className={navLinkStyle}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin size={18} /> All Properties
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/add-property"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus size={18} /> Add Property
                  </NavLink>
                  <NavLink
                    to="/my-properties"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} /> My Properties
                  </NavLink>
                  <NavLink
                    to="/my-ratings"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Star size={18} /> My Ratings
                  </NavLink>
                  <NavLink
                    to="/favorites"
                    className={navLinkStyle}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaHeart size={18} /> Favorites
                  </NavLink>

                  {/* Mobile Notifications */}
                  <div className="pt-2 border-t border-base-200">
                    <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <span className="font-medium flex items-center gap-2">
                        <Bell size={18} /> Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span className="badge badge-error badge-sm">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {notificationsLoading ? (
                      <div className="mt-2 p-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                      </div>
                    ) : notifications.length > 0 ? (
                      <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                        {notifications.slice(0, 3).map((n) => (
                          <div
                            key={n._id || n.id}
                            className={`p-3 rounded-lg text-sm cursor-pointer ${
                              !n.read ? "bg-primary/10" : "bg-base-200"
                            }`}
                            onClick={() => {
                              handleNotificationClick(n);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {n.type && (
                              <span className="text-xs text-primary font-semibold">
                                {n.type}
                              </span>
                            )}
                            <p className="line-clamp-2">{n.message}</p>
                            <p className="text-xs text-base-content/60 mt-1">
                              {timeAgo(n.timestamp || n.time)}
                            </p>
                          </div>
                        ))}
                        {notifications.length > 3 && (
                          <p className="text-xs text-center text-base-content/70 py-2">
                            +{notifications.length - 3} more
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 p-4 text-center text-sm text-base-content/70">
                        No notifications
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-base-200 space-y-4">
              <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
                <span className="font-medium">Theme</span>
                <button
                  onClick={switchTheme}
                  className="p-2 rounded-lg bg-base-100"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {user ? (
                <div className="space-y-3">
                  <div className="p-3 bg-base-200 rounded-lg">
                    <p className="font-semibold text-base-content truncate">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-sm text-base-content/70 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-error text-error-content rounded-lg font-medium hover:opacity-90"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 text-primary font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 bg-primary text-primary-content rounded-lg font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;