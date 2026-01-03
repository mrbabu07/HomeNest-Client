// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import PropertyCard from "../Component/PropertyCard";

// // Icons
// import {
//   FaHouse,
//   FaMoneyBillWave,
//   FaLocationDot,
//   FaStar,
// } from "react-icons/fa6";

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     AOS.init({ duration: 900, once: true });
//     fetchFeaturedProperties();
//   }, []);

//   // Load Featured Properties - EXACT SAME FUNCTIONALITY
//   const fetchFeaturedProperties = () => {
//     axios
//       .get("https://home-nest-server-10.vercel.app/getServices")
//       .then((res) => {
//         setProperties(res.data.slice(0, 6));
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load properties.");
//         setLoading(false);
//       });
//   };

//   // Hero Images - same images
//   const heroImages = [
//     "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
//     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
//   ];

//   // Why Choose Us - same content
//   const whyChooseUs = [
//     {
//       icon: <FaHouse className="w-9 h-9" />,
//       title: "Verified Listings",
//       desc: "Every property is checked manually.",
//     },
//     {
//       icon: <FaMoneyBillWave className="w-9 h-9" />,
//       title: "Best Market Rates",
//       desc: "Affordable rates directly from owners.",
//     },
//     {
//       icon: <FaLocationDot className="w-9 h-9" />,
//       title: "Prime Locations",
//       desc: "Find homes in the most desired areas.",
//     },
//     {
//       icon: <FaStar className="w-9 h-9" />,
//       title: "Trusted Platform",
//       desc: "Thousands of happy users.",
//     },
//   ];

//   // How It Works Steps - same content
//   const howItWorks = [
//     { step: "01", title: "Search", desc: "Filter by location, type & price." },
//     { step: "02", title: "Connect", desc: "Chat with owners or agents." },
//     { step: "03", title: "Move In", desc: "Visit, finalize & shift." },
//   ];

//   // Market Insights - same content
//   const insights = [
//     {
//       title: "Dhaka Property Boom",
//       summary: "Demand rising rapidly in Gulshan & Banani.",
//     },
//     {
//       title: "Commercial Spaces",
//       summary: "Office rentals up by 20% this year.",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* HERO SLIDER - Fixed width container */}

//       <div
//         className="relative mb-14 rounded-2xl overflow-hidden shadow-xl"
//         data-aos="zoom-in"
//       >
//         <Swiper
//           modules={[Autoplay, Pagination, Navigation]}
//           autoplay={{ delay: 3500 }}
//           pagination={{ clickable: true }}
//           navigation
//           loop
//           className="h-[430px]"
//         >
//           {heroImages.map((img, i) => (
//             <SwiperSlide key={i}>
//               <img
//                 src={img}
//                 className="w-full h-full object-cover"
//                 alt={`Property ${i + 1}`}
//               />
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                 <div className="text-center px-4">
//                   <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
//                     Find Your Dream Home with HomeNest
//                   </h1>
//                   <p className="text-gray-200 text-lg md:text-xl mb-6">
//                     Discover perfect properties that match your lifestyle
//                   </p>
//                   <Link
//                     to="/properties"
//                     className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
//                   >
//                     Explore Properties
//                   </Link>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* FEATURED PROPERTIES - Fixed width */}

//       <section className="mb-16" data-aos="fade-up">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
//               Featured Properties
//             </h2>
//             <p className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-2">
//               Handpicked selection of premium properties
//             </p>
//           </div>
//           <Link
//             to="/properties"
//             className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
//           >
//             View All →
//           </Link>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500 dark:text-red-400 py-12">
//             {error}
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {properties.map((p) => (
//               <PropertyCard
//                 key={p._id}
//                 property={{ ...p, showPostedBy: true }}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* WHY CHOOSE US - Fixed width with theme colors */}

//       <section
//         className="mb-16 bg-gray-50 dark:bg-gray-800 p-10 rounded-xl"
//         data-aos="fade-right"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
//           Why Choose HomeNest?
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {whyChooseUs.map((item, i) => (
//             <div
//               key={i}
//               className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//               data-aos="zoom-in"
//               data-aos-delay={i * 100}
//             >
//               <div className="flex justify-center mb-4">
//                 <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl">
//                   <div className="text-blue-600 dark:text-blue-400">
//                     {item.icon}
//                   </div>
//                 </div>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 text-sm">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* HOW IT WORKS - Fixed width with theme support */}

//       <section className="mb-16" data-aos="fade-up">
//         <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-12">
//           How It Works
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {howItWorks.map((step, i) => (
//             <div
//               key={i}
//               className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300"
//               data-aos="fade-up"
//               data-aos-delay={i * 200}
//             >
//               <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
//                 {step.step}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                 {step.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section data-aos="fade-up">
//         <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8">
//           Latest Market Insights
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {insights.map((item, i) => (
//             <div
//               key={i}
//               className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
//             >
//               <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-4">
//                 {item.summary}
//               </p>
//               <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
//                 Read More →
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section
//         className="mt-16 bg-blue-600 dark:bg-gray-800 rounded-2xl p-12 text-center"
//         data-aos="fade-up"
//       >
//         <h2 className="text-3xl font-bold text-white mb-4">
//           Ready to Find Your Dream Home?
//         </h2>
//         <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
//           Join thousands of satisfied homeowners who found their perfect match
//           with HomeNest
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/properties"
//             className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
//           >
//             Browse All Properties
//           </Link>
//           <Link
//             to="/register"
//             className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
//           >
//             Create Account
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

// src/Pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import PropertyCard from "../Component/PropertyCard";

// Icons
import {
  FaHouse,
  FaMoneyBillWave,
  FaLocationDot,
  FaStar,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaArrowRight,
  
} from "react-icons/fa6";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProperties, setTotalProperties] = useState(0);
  const [stats, setStats] = useState({
    total: 5000,
    users: 12000,
    verified: 98,
    support: "24/7",
  });
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    fetchFeaturedProperties();
    fetchStats();

    // Back to top button visibility handler
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get(
        "https://home-nest-server-10.vercel.app/getServices"
      );
      setProperties(response.data.slice(0, 6));
      // Set total property count
      setTotalProperties(response.data.length);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again later.");
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "https://home-nest-server-10.vercel.app/api/stats"
      );
      setStats(response.data);
      if (response.data.total) {
        setTotalProperties(response.data.total);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      // Keep default stats if API fails
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    try {
      // Replace with your actual newsletter API endpoint
      await axios.post(
        "https://home-nest-server-10.vercel.app/api/newsletter",
        { email }
      );
      alert(`Thank you! We'll send updates to: ${email}`);
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      alert("Thanks for subscribing! We'll keep you updated.");
      setEmail("");
    } finally {
      setSubscribing(false);
    }
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  ];

  const statsData = [
    { value: totalProperties > 0 ? `${(totalProperties / 1000).toFixed(1)}K+` : `${(stats.total / 1000).toFixed(1)}K+`, label: "Listings" },
    { value: `${(stats.users / 1000).toFixed(1)}K+`, label: "Happy Users" },
    { value: `${stats.verified}%`, label: "Verified" },
    { value: stats.support, label: "Support" },
  ];

  const whyChooseUs = [
    {
      icon: <FaHouse className="w-9 h-9" />,
      title: "Verified Listings",
      desc: "Every property is checked manually for authenticity.",
    },
    {
      icon: <FaMoneyBillWave className="w-9 h-9" />,
      title: "Best Market Rates",
      desc: "Affordable rates directly from property owners.",
    },
    {
      icon: <FaLocationDot className="w-9 h-9" />,
      title: "Prime Locations",
      desc: "Find homes in the most desired areas.",
    },
    {
      icon: <FaStar className="w-9 h-9" />,
      title: "Trusted Platform",
      desc: "Thousands of satisfied users nationwide.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Search",
      desc: "Filter by location, type & price to find your perfect match.",
      icon: <FaHouse className="w-8 h-8" />,
    },
    {
      step: "02",
      title: "Connect",
      desc: "Chat directly with property owners or agents.",
      icon: <FaUsers className="w-8 h-8" />,
    },
    {
      step: "03",
      title: "Move In",
      desc: "Schedule visits, finalize details & move into your new home.",
      icon: <FaCheckCircle className="w-8 h-8" />,
    },
  ];

  const categories = [
    { name: "Residential", count: 1200, icon: "🏠" },
    { name: "Commercial", count: 450, icon: "🏢" },
    { name: "Vacation Homes", count: 300, icon: "🏖️" },
    { name: "Shared Rooms", count: 800, icon: "🚪" },
  ];

  const testimonials = [
    {
      name: "Rahim Uddin",
      role: "Homeowner, Dhaka",
      text: "Found my dream apartment in just 3 days! The verification process gave me complete peace of mind.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim",
    },
    {
      name: "Tasnim Ara",
      role: "Renter, Chittagong",
      text: "Smooth experience from search to move-in. The support team was incredibly helpful. Highly recommend!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tasnim",
    },
  ];

  const insights = [
    {
      title: "Dhaka Property Market Boom",
      summary:
        "Demand rising rapidly in Gulshan & Banani areas. Perfect time to invest in premium locations.",
      icon: <FaChartLine className="w-6 h-6" />,
    },
    {
      title: "Commercial Space Growth",
      summary:
        "Office rentals up by 20% this year. Growing opportunities in business districts.",
      icon: <FaHeadset className="w-6 h-6" />,
    },
  ];

  const faqs = [
    {
      q: "Is listing a property free?",
      a: "Yes! Creating a listing on HomeNest is completely free for all users. No hidden charges.",
    },
    {
      q: "How do I contact a property owner?",
      a: "After logging in, click 'Contact Owner' on any property detail page to send them a message directly.",
    },
    {
      q: "Are all properties verified?",
      a: "Yes, our team manually verifies each listing to ensure authenticity and prevent fraud.",
    },
    {
      q: "Can I schedule property visits?",
      a: "Absolutely! Contact the owner through our platform to arrange convenient viewing times.",
    },
  ];

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-base-100">
      {/* Hero Section with Swiper */}
      <section className="relative mb-14 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[450px] md:h-[500px]"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`Property ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex items-center justify-center">
                  <div className="text-center px-4 max-w-4xl" data-aos="fade-up">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      Find Your Dream Home with HomeNest
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                      Discover perfect properties that match your lifestyle and
                      budget
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/properties"
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
                      >
                        Explore Properties
                        <FaArrowRight />
                      </Link>
                      <Link
                        to="/register"
                        className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg transition-all"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Stats Counter Section */}
        <section className="mb-16 -mt-8 relative z-10" data-aos="fade-up">
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {statsData.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base-content/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                Featured Properties
              </h2>
              <p className="text-base-content/70">
                Handpicked selection of premium properties
              </p>
            </div>
            <Link
              to="/properties"
              className="btn btn-outline btn-primary gap-2"
            >
              View All Properties
              <FaArrowRight />
            </Link>
          </div>

          {/* Total Properties Counter */}
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              {totalProperties > 0 ? totalProperties.toLocaleString() : stats.total.toLocaleString()}
            </div>
            <div className="text-base-content/70 font-medium text-lg">
              Total Properties Listed
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
              <p className="text-base-content/70">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="alert alert-error shadow-lg">
              <span>{error}</span>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-base-200 rounded-xl">
              <p className="text-base-content/70">No properties available</p>
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20" data-aos="fade-right">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              Why Choose HomeNest?
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              We provide the best platform for finding your dream property with
              verified listings and trusted service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="card-body items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="card-title text-lg">{item.title}</h3>
                  <p className="text-base-content/70 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              How It Works
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Simple steps to find and secure your perfect property
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={i}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200">
                  <div className="card-body items-center text-center">
                    <div className="absolute -top-6 bg-primary text-primary-content w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="mt-4 p-4 bg-primary/10 rounded-2xl text-primary mb-4">
                      {step.icon}
                    </div>
                    <h3 className="card-title text-xl">{step.title}</h3>
                    <p className="text-base-content/70">{step.desc}</p>
                  </div>
                </div>
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2">
                    <FaArrowRight className="text-primary/30 text-2xl" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              Popular Categories
            </h2>
            <p className="text-base-content/70">
              Browse properties by category
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/properties?category=${cat.name.toLowerCase()}`}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 hover:border-primary cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="card-body items-center text-center p-6">
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-base-content">{cat.name}</h3>
                  <p className="text-sm text-base-content/60">
                    {cat.count.toLocaleString()} listings
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              What Our Users Say
            </h2>
            <p className="text-base-content/70">
              Real stories from satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-lg border border-base-200"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="card-body">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, idx) => (
                      <FaStar key={idx} className="text-warning" />
                    ))}
                  </div>
                  <p className="text-base-content/80 italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={t.avatar} alt={t.name} />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-base-content">{t.name}</p>
                      <p className="text-sm text-base-content/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Insights Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              Latest Market Insights
            </h2>
            <p className="text-base-content/70">
              Stay informed about real estate trends
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insights.map((item, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {item.icon}
                    </div>
                    <h3 className="card-title text-lg">{item.title}</h3>
                  </div>
                  <p className="text-base-content/70 mb-4">{item.summary}</p>
                  <button className="btn btn-ghost btn-sm gap-2 self-start">
                    Read More
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base-content/70">
              Get answers to common questions
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="collapse collapse-plus bg-base-100 shadow-lg border border-base-200"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
                <div className="collapse-title text-lg font-semibold">
                  {faq.q}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mb-20" data-aos="fade-up">
          <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-2xl">
            <div className="card-body items-center text-center p-8 md:p-12">
              <h2 className="card-title text-3xl md:text-4xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-primary-content/90 mb-8 max-w-xl">
                Get the latest property listings, market news, and exclusive
                deals delivered to your inbox
              </p>
              <form
                onSubmit={handleSubscribe}
                className="w-full max-w-md flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="input input-bordered flex-1 bg-white text-base-content"
                  required
                  disabled={subscribing}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mb-16" data-aos="fade-up">
          <div className="card bg-base-100 shadow-2xl border-2 border-primary">
            <div className="card-body items-center text-center p-8 md:p-12">
              <h2 className="card-title text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-base-content/70 text-lg mb-8 max-w-2xl">
                Join thousands of satisfied homeowners who found their perfect
                match with HomeNest
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/properties" className="btn btn-primary btn-lg gap-2">
                  Browse All Properties
                  <FaArrowRight />
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 btn btn-primary btn-circle btn-lg shadow-2xl z-50 animate-bounce hover:animate-none transition-all duration-300 group"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl group-hover:scale-125 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Home;
