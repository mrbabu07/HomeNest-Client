// src/Pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaHome,
  FaEye,
  FaStar,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaArrowUp,
  FaArrowDown,
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  // State management
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [myProperties, setMyProperties] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [globalStats, setGlobalStats] = useState({
    totalProperties: 0,
    totalReviews: 0,
    verified: 0,
    support: "24/7",
  });

  // Fetch all dashboard data
  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      setStatsLoading(false);
      return;
    }

    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setStatsLoading(true);

      // Fetch user's properties
      const propertiesRes = await axios.get(
        `http://localhost:3000/myServices?email=${user.email}`
      );
      const properties = Array.isArray(propertiesRes.data) ? propertiesRes.data : [];
      setMyProperties(properties);

      // Fetch user's reviews
      const reviewsRes = await axios.get(
        `http://localhost:3000/reviewsByUser/${user.email}`
      );
      const reviews = Array.isArray(reviewsRes.data) ? reviewsRes.data : [];
      setMyReviews(reviews);

      // Fetch global stats
      const statsRes = await axios.get("http://localhost:3000/api/stats");
      setGlobalStats(statsRes.data || globalStats);

      setStatsLoading(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
      setLoading(false);
      setStatsLoading(false);
    }
  };

  // Calculate user statistics
  const userStats = {
    totalListings: myProperties.length,
    totalViews: myProperties.reduce((sum, p) => sum + (p.views || 0), 0),
    totalReviews: myProperties.reduce((sum, p) => sum + (p.reviews?.length || 0), 0),
    avgRating: myProperties.length > 0
      ? (myProperties.reduce((sum, p) => sum + (p.rating || 0), 0) / myProperties.length).toFixed(1)
      : 0,
    totalValue: myProperties.reduce((sum, p) => sum + (p.price || 0), 0),
  };

  // Prepare chart data - Properties by category
  const categoryData = myProperties.reduce((acc, property) => {
    const category = property.category || "other";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, []);

  // Properties by month (last 6 months)
  const monthlyData = (() => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      
      const count = myProperties.filter((p) => {
        const propDate = new Date(p.postedDate);
        return (
          propDate.getMonth() === date.getMonth() &&
          propDate.getFullYear() === date.getFullYear()
        );
      }).length;

      months.push({ month: monthName, properties: count });
    }
    
    return months;
  })();

  // Price range distribution
  const priceRangeData = [
    {
      range: "0-50k",
      count: myProperties.filter((p) => p.price < 50000).length,
    },
    {
      range: "50k-100k",
      count: myProperties.filter((p) => p.price >= 50000 && p.price < 100000).length,
    },
    {
      range: "100k-200k",
      count: myProperties.filter((p) => p.price >= 100000 && p.price < 200000).length,
    },
    {
      range: "200k+",
      count: myProperties.filter((p) => p.price >= 200000).length,
    },
  ];

  // Chart colors
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-primary mx-auto mb-4" />
          <p className="text-base-content/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
            Welcome back, {user?.displayName || "User"}! 👋
          </h1>
          <p className="text-base-content/70">
            Here's what's happening with your properties today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Total Listings */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FaHome className="text-2xl" />
              </div>
              {statsLoading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <div className="flex items-center gap-1 text-sm">
                  <FaArrowUp className="text-xs" />
                  <span>+12%</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{userStats.totalListings}</div>
            <div className="text-sm opacity-90">Total Listings</div>
          </div>

          {/* Total Value */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FaDollarSign className="text-2xl" />
              </div>
              {statsLoading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <div className="flex items-center gap-1 text-sm">
                  <FaArrowUp className="text-xs" />
                  <span>+8%</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">
              ${(userStats.totalValue / 1000).toFixed(0)}k
            </div>
            <div className="text-sm opacity-90">Total Value</div>
          </div>

          {/* Total Reviews */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FaStar className="text-2xl" />
              </div>
              {statsLoading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <div className="flex items-center gap-1 text-sm">
                  <FaArrowUp className="text-xs" />
                  <span>+15%</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{userStats.totalReviews}</div>
            <div className="text-sm opacity-90">Total Reviews</div>
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <FaChartLine className="text-2xl" />
              </div>
              {statsLoading ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <div className="flex items-center gap-1 text-sm">
                  <FaArrowUp className="text-xs" />
                  <span>+0.3</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold mb-1">{userStats.avgRating}</div>
            <div className="text-sm opacity-90">Avg Rating</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Properties Chart */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Properties Added
                </h3>
                <p className="text-sm text-base-content/70">Last 6 months</p>
              </div>
              <Activity className="text-primary" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="properties"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorProperties)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Price Range Distribution */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Price Distribution
                </h3>
                <p className="text-sm text-base-content/70">By price range</p>
              </div>
              <TrendingUp className="text-success" size={24} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="range" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Categories
                </h3>
                <p className="text-sm text-base-content/70">Property types</p>
              </div>
              <FaHome className="text-warning text-2xl" />
            </div>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-base-content/50">
                No data available
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-base-content">
                Quick Actions
              </h3>
              <p className="text-sm text-base-content/70">Manage your account</p>
            </div>
            <div className="space-y-3">
              <Link
                to="/add-property"
                className="btn btn-primary w-full justify-start gap-3"
              >
                <FaPlus /> Add New Property
              </Link>
              <Link
                to="/my-properties"
                className="btn btn-outline w-full justify-start gap-3"
              >
                <FaHome /> View All Properties
              </Link>
              <Link
                to="/my-reviews"
                className="btn btn-outline w-full justify-start gap-3"
              >
                <FaStar /> My Reviews
              </Link>
              <Link
                to="/profile"
                className="btn btn-outline w-full justify-start gap-3"
              >
                <FaEdit /> Edit Profile
              </Link>
            </div>

            {/* Global Stats */}
            <div className="mt-6 pt-6 border-t border-base-200">
              <h4 className="font-semibold text-base-content mb-3">Platform Stats</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-base-200 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {globalStats.totalProperties}
                  </div>
                  <div className="text-xs text-base-content/70">Total Properties</div>
                </div>
                <div className="bg-base-200 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {globalStats.totalReviews}
                  </div>
                  <div className="text-xs text-base-content/70">Total Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Properties Table */}
        <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-base-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-base-content">
                  Recent Properties
                </h3>
                <p className="text-sm text-base-content/70">
                  Your latest listings
                </p>
              </div>
              <Link to="/my-properties" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
          </div>

          {myProperties.length === 0 ? (
            <div className="text-center py-12">
              <FaHome className="text-5xl text-base-content/30 mx-auto mb-4" />
              <p className="text-base-content/70 mb-4">No properties yet</p>
              <Link to="/add-property" className="btn btn-primary gap-2">
                <FaPlus /> Add Your First Property
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-base-200 text-base-content">
                    <tr>
                      <th className="p-4 text-left">Property</th>
                      <th className="p-4 text-left">Category</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="p-4 text-left">Location</th>
                      <th className="p-4 text-center">Rating</th>
                      <th className="p-4 text-center">Reviews</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-base-200">
                    {myProperties.slice(0, 5).map((property) => (
                      <tr
                        key={property._id}
                        className="hover:bg-base-200/50 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={property.imageURL || property.imageURLs?.[0]}
                              alt={property.name}
                              className="w-16 h-16 object-cover rounded-lg"
                              onError={(e) =>
                                (e.target.src = "https://placehold.co/100?text=Property")
                              }
                            />
                            <div>
                              <div className="font-semibold text-base-content">
                                {property.name}
                              </div>
                              <div className="text-xs text-base-content/70 flex items-center gap-1 mt-1">
                                <FaCalendar />
                                {new Date(property.postedDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="badge badge-primary">
                            {property.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-bold text-base-content">
                            ${property.price?.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-base-content/80">
                            <FaMapMarkerAlt className="text-xs" />
                            <span className="truncate max-w-[150px]">
                              {property.location}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <FaStar className="text-warning" />
                            <span className="font-semibold">
                              {property.rating?.toFixed(1) || "0.0"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="badge badge-ghost">
                            {property.reviews?.length || 0}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/property/${property._id}`}
                              className="btn btn-sm btn-ghost"
                              title="View"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              to={`/update-property/${property._id}`}
                              className="btn btn-sm btn-ghost"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-base-200">
                {myProperties.slice(0, 5).map((property) => (
                  <div key={property._id} className="p-4">
                    <div className="flex gap-3 mb-3">
                      <img
                        src={property.imageURL || property.imageURLs?.[0]}
                        alt={property.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) =>
                          (e.target.src = "https://placehold.co/100?text=Property")
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base-content truncate">
                          {property.name}
                        </h4>
                        <p className="text-sm text-base-content/70 truncate">
                          {property.location}
                        </p>
                        <p className="text-lg font-bold text-primary mt-1">
                          ${property.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge badge-primary">{property.category}</span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warning" />
                        <span className="font-semibold">
                          {property.rating?.toFixed(1) || "0.0"}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/property/${property._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        <FaEye /> View
                      </Link>
                      <Link
                        to={`/update-property/${property._id}`}
                        className="btn btn-sm btn-secondary"
                      >
                        <FaEdit /> Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Top Rated Properties */}
        {myProperties.length > 0 && (
          <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden">
            <div className="p-6 border-b border-base-200">
              <h3 className="text-xl font-bold text-base-content">
                Top Rated Properties
              </h3>
              <p className="text-sm text-base-content/70">
                Your best performing listings
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {myProperties
                  .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                  .slice(0, 3)
                  .map((property) => (
                    <Link
                      key={property._id}
                      to={`/property/${property._id}`}
                      className="group bg-base-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative h-40">
                        <img
                          src={property.imageURL || property.imageURLs?.[0]}
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) =>
                            (e.target.src = "https://placehold.co/400x300?text=Property")
                          }
                        />
                        <div className="absolute top-2 right-2 bg-warning text-warning-content px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold">
                          <FaStar />
                          {property.rating?.toFixed(1) || "0.0"}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base-content truncate mb-2">
                          {property.name}
                        </h4>
                        <p className="text-sm text-base-content/70 mb-2">
                          {property.reviews?.length || 0} reviews
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ${property.price?.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;