// // src/Pages/Home.jsx
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
//   FaUsers,
//   FaChartLine,
//   FaHeadset,
//   FaArrowRight,

// } from "react-icons/fa6";
// import { FaArrowUp, FaCheckCircle } from "react-icons/fa";

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalProperties, setTotalProperties] = useState(0);
//   const [stats, setStats] = useState({
//     total: 5000,
//     users: 12000,
//     verified: 98,
//     support: "24/7",
//   });
//   const [email, setEmail] = useState("");
//   const [subscribing, setSubscribing] = useState(false);
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 900, once: true });
//     fetchFeaturedProperties();
//     fetchStats();

//     // Back to top button visibility handler
//     const handleScroll = () => {
//       setShowBackToTop(window.scrollY > 600);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const fetchFeaturedProperties = async () => {
//     try {
//       const response = await axios.get(
//         "https://home-nest-server-10.vercel.app/getServices"
//       );
//       setProperties(response.data.slice(0, 6));
//       // Set total property count
//       setTotalProperties(response.data.length);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching properties:", err);
//       setError("Failed to load properties. Please try again later.");
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get(
//         "https://home-nest-server-10.vercel.app/api/stats"
//       );
//       setStats(response.data);
//       if (response.data.total) {
//         setTotalProperties(response.data.total);
//       }
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//       // Keep default stats if API fails
//     }
//   };

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (!email) return;

//     setSubscribing(true);
//     try {
//       // Replace with your actual newsletter API endpoint
//       await axios.post(
//         "https://home-nest-server-10.vercel.app/api/newsletter",
//         { email }
//       );
//       alert(`Thank you! We'll send updates to: ${email}`);
//       setEmail("");
//     } catch (err) {
//       console.error("Newsletter subscription error:", err);
//       alert("Thanks for subscribing! We'll keep you updated.");
//       setEmail("");
//     } finally {
//       setSubscribing(false);
//     }
//   };

//   const heroImages = [
//     "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
//     "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
//     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
//   ];

//   const statsData = [
//     { value: totalProperties > 0 ? `${(totalProperties / 1000).toFixed(1)}K+` : `${(stats.total / 1000).toFixed(1)}K+`, label: "Listings" },
//     { value: `${(stats.users / 1000).toFixed(1)}K+`, label: "Happy Users" },
//     { value: `${stats.verified}%`, label: "Verified" },
//     { value: stats.support, label: "Support" },
//   ];

//   const whyChooseUs = [
//     {
//       icon: <FaHouse className="w-9 h-9" />,
//       title: "Verified Listings",
//       desc: "Every property is checked manually for authenticity.",
//     },
//     {
//       icon: <FaMoneyBillWave className="w-9 h-9" />,
//       title: "Best Market Rates",
//       desc: "Affordable rates directly from property owners.",
//     },
//     {
//       icon: <FaLocationDot className="w-9 h-9" />,
//       title: "Prime Locations",
//       desc: "Find homes in the most desired areas.",
//     },
//     {
//       icon: <FaStar className="w-9 h-9" />,
//       title: "Trusted Platform",
//       desc: "Thousands of satisfied users nationwide.",
//     },
//   ];

//   const howItWorks = [
//     {
//       step: "01",
//       title: "Search",
//       desc: "Filter by location, type & price to find your perfect match.",
//       icon: <FaHouse className="w-8 h-8" />,
//     },
//     {
//       step: "02",
//       title: "Connect",
//       desc: "Chat directly with property owners or agents.",
//       icon: <FaUsers className="w-8 h-8" />,
//     },
//     {
//       step: "03",
//       title: "Move In",
//       desc: "Schedule visits, finalize details & move into your new home.",
//       icon: <FaCheckCircle className="w-8 h-8" />,
//     },
//   ];

//   const categories = [
//     { name: "Residential", count: 1200, icon: "🏠" },
//     { name: "Commercial", count: 450, icon: "🏢" },
//     { name: "Vacation Homes", count: 300, icon: "🏖️" },
//     { name: "Shared Rooms", count: 800, icon: "🚪" },
//   ];

//   const testimonials = [
//     {
//       name: "Rahim Uddin",
//       role: "Homeowner, Dhaka",
//       text: "Found my dream apartment in just 3 days! The verification process gave me complete peace of mind.",
//       rating: 5,
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim",
//     },
//     {
//       name: "Tasnim Ara",
//       role: "Renter, Chittagong",
//       text: "Smooth experience from search to move-in. The support team was incredibly helpful. Highly recommend!",
//       rating: 5,
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tasnim",
//     },
//   ];

//   const insights = [
//     {
//       title: "Dhaka Property Market Boom",
//       summary:
//         "Demand rising rapidly in Gulshan & Banani areas. Perfect time to invest in premium locations.",
//       icon: <FaChartLine className="w-6 h-6" />,
//     },
//     {
//       title: "Commercial Space Growth",
//       summary:
//         "Office rentals up by 20% this year. Growing opportunities in business districts.",
//       icon: <FaHeadset className="w-6 h-6" />,
//     },
//   ];

//   const faqs = [
//     {
//       q: "Is listing a property free?",
//       a: "Yes! Creating a listing on HomeNest is completely free for all users. No hidden charges.",
//     },
//     {
//       q: "How do I contact a property owner?",
//       a: "After logging in, click 'Contact Owner' on any property detail page to send them a message directly.",
//     },
//     {
//       q: "Are all properties verified?",
//       a: "Yes, our team manually verifies each listing to ensure authenticity and prevent fraud.",
//     },
//     {
//       q: "Can I schedule property visits?",
//       a: "Absolutely! Contact the owner through our platform to arrange convenient viewing times.",
//     },
//   ];

//   // Scroll to top handler
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="bg-base-100">
//       {/* Hero Section with Swiper */}
//       <section className="relative mb-14 overflow-hidden">
//         <Swiper
//           modules={[Autoplay, Pagination, Navigation]}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           navigation
//           loop
//           className="h-[450px] md:h-[500px]"
//         >
//           {heroImages.map((img, i) => (
//             <SwiperSlide key={i}>
//               <div className="relative h-full">
//                 <img
//                   src={img}
//                   className="w-full h-full object-cover"
//                   alt={`Property ${i + 1}`}
//                   loading={i === 0 ? "eager" : "lazy"}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex items-center justify-center">
//                   <div className="text-center px-4 max-w-4xl" data-aos="fade-up">
//                     <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
//                       Find Your Dream Home with HomeNest
//                     </h1>
//                     <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
//                       Discover perfect properties that match your lifestyle and
//                       budget
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                       <Link
//                         to="/properties"
//                         className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-focus text-primary-content font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
//                       >
//                         Explore Properties
//                         <FaArrowRight />
//                       </Link>
//                       <Link
//                         to="/register"
//                         className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg transition-all"
//                       >
//                         Get Started
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </section>

//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         {/* Stats Counter Section */}
//         <section className="mb-16 -mt-8 relative z-10" data-aos="fade-up">
//           <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {statsData.map((stat, i) => (
//                 <div key={i} className="text-center">
//                   <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-base-content/70 font-medium">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Featured Properties Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
//                 Featured Properties
//               </h2>
//               <p className="text-base-content/70">
//                 Handpicked selection of premium properties
//               </p>
//             </div>
//             <Link
//               to="/properties"
//               className="btn btn-outline btn-primary gap-2"
//             >
//               View All Properties
//               <FaArrowRight />
//             </Link>
//           </div>

//           {/* Total Properties Counter */}
//           <div className="text-center mb-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
//             <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
//               {totalProperties > 0 ? totalProperties.toLocaleString() : stats.total.toLocaleString()}
//             </div>
//             <div className="text-base-content/70 font-medium text-lg">
//               Total Properties Listed
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex flex-col justify-center items-center py-20">
//               <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
//               <p className="text-base-content/70">Loading properties...</p>
//             </div>
//           ) : error ? (
//             <div className="alert alert-error shadow-lg">
//               <span>{error}</span>
//             </div>
//           ) : properties.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {properties.map((p) => (
//                 <PropertyCard key={p._id} property={p} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20 bg-base-200 rounded-xl">
//               <p className="text-base-content/70">No properties available</p>
//             </div>
//           )}
//         </section>

//         {/* Why Choose Us Section */}
//         <section className="mb-20" data-aos="fade-right">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               Why Choose HomeNest?
//             </h2>
//             <p className="text-base-content/70 max-w-2xl mx-auto">
//               We provide the best platform for finding your dream property with
//               verified listings and trusted service
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {whyChooseUs.map((item, i) => (
//               <div
//                 key={i}
//                 className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//               >
//                 <div className="card-body items-center text-center">
//                   <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-4">
//                     {item.icon}
//                   </div>
//                   <h3 className="card-title text-lg">{item.title}</h3>
//                   <p className="text-base-content/70 text-sm">{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               How It Works
//             </h2>
//             <p className="text-base-content/70 max-w-2xl mx-auto">
//               Simple steps to find and secure your perfect property
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {howItWorks.map((step, i) => (
//               <div
//                 key={i}
//                 className="relative"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 150}
//               >
//                 <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200">
//                   <div className="card-body items-center text-center">
//                     <div className="absolute -top-6 bg-primary text-primary-content w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
//                       {step.step}
//                     </div>
//                     <div className="mt-4 p-4 bg-primary/10 rounded-2xl text-primary mb-4">
//                       {step.icon}
//                     </div>
//                     <h3 className="card-title text-xl">{step.title}</h3>
//                     <p className="text-base-content/70">{step.desc}</p>
//                   </div>
//                 </div>
//                 {i < howItWorks.length - 1 && (
//                   <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2">
//                     <FaArrowRight className="text-primary/30 text-2xl" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Popular Categories Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               Popular Categories
//             </h2>
//             <p className="text-base-content/70">
//               Browse properties by category
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {categories.map((cat, i) => (
//               <Link
//                 key={i}
//                 to={`/properties?category=${cat.name.toLowerCase()}`}
//                 className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 hover:border-primary cursor-pointer"
//                 data-aos="zoom-in"
//                 data-aos-delay={i * 100}
//               >
//                 <div className="card-body items-center text-center p-6">
//                   <div className="text-4xl mb-3">{cat.icon}</div>
//                   <h3 className="font-bold text-base-content">{cat.name}</h3>
//                   <p className="text-sm text-base-content/60">
//                     {cat.count.toLocaleString()} listings
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               What Our Users Say
//             </h2>
//             <p className="text-base-content/70">
//               Real stories from satisfied customers
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {testimonials.map((t, i) => (
//               <div
//                 key={i}
//                 className="card bg-base-100 shadow-lg border border-base-200"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//               >
//                 <div className="card-body">
//                   <div className="flex gap-1 mb-4">
//                     {[...Array(t.rating)].map((_, idx) => (
//                       <FaStar key={idx} className="text-warning" />
//                     ))}
//                   </div>
//                   <p className="text-base-content/80 italic mb-6">"{t.text}"</p>
//                   <div className="flex items-center gap-3">
//                     <div className="avatar">
//                       <div className="w-12 rounded-full">
//                         <img src={t.avatar} alt={t.name} />
//                       </div>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-base-content">{t.name}</p>
//                       <p className="text-sm text-base-content/60">{t.role}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Market Insights Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               Latest Market Insights
//             </h2>
//             <p className="text-base-content/70">
//               Stay informed about real estate trends
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {insights.map((item, i) => (
//               <div
//                 key={i}
//                 className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 100}
//               >
//                 <div className="card-body">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="p-3 bg-primary/10 rounded-lg text-primary">
//                       {item.icon}
//                     </div>
//                     <h3 className="card-title text-lg">{item.title}</h3>
//                   </div>
//                   <p className="text-base-content/70 mb-4">{item.summary}</p>
//                   <button className="btn btn-ghost btn-sm gap-2 self-start">
//                     Read More
//                     <FaArrowRight />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-base-content/70">
//               Get answers to common questions
//             </p>
//           </div>
//           <div className="max-w-3xl mx-auto space-y-4">
//             {faqs.map((faq, i) => (
//               <div
//                 key={i}
//                 className="collapse collapse-plus bg-base-100 shadow-lg border border-base-200"
//                 data-aos="fade-up"
//                 data-aos-delay={i * 50}
//               >
//                 <input type="radio" name="faq-accordion" defaultChecked={i === 0} />
//                 <div className="collapse-title text-lg font-semibold">
//                   {faq.q}
//                 </div>
//                 <div className="collapse-content">
//                   <p className="text-base-content/70">{faq.a}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Newsletter Section */}
//         <section className="mb-20" data-aos="fade-up">
//           <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-2xl">
//             <div className="card-body items-center text-center p-8 md:p-12">
//               <h2 className="card-title text-3xl md:text-4xl font-bold mb-4">
//                 Stay Updated
//               </h2>
//               <p className="text-primary-content/90 mb-8 max-w-xl">
//                 Get the latest property listings, market news, and exclusive
//                 deals delivered to your inbox
//               </p>
//               <form
//                 onSubmit={handleSubscribe}
//                 className="w-full max-w-md flex flex-col sm:flex-row gap-3"
//               >
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Your email address"
//                   className="input input-bordered flex-1 bg-white text-base-content"
//                   required
//                   disabled={subscribing}
//                 />
//                 <button
//                   type="submit"
//                   className="btn btn-secondary"
//                   disabled={subscribing}
//                 >
//                   {subscribing ? (
//                     <span className="loading loading-spinner"></span>
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </section>

//         {/* Final CTA Section */}
//         <section className="mb-16" data-aos="fade-up">
//           <div className="card bg-base-100 shadow-2xl border-2 border-primary">
//             <div className="card-body items-center text-center p-8 md:p-12">
//               <h2 className="card-title text-3xl md:text-4xl font-bold mb-4">
//                 Ready to Find Your Dream Home?
//               </h2>
//               <p className="text-base-content/70 text-lg mb-8 max-w-2xl">
//                 Join thousands of satisfied homeowners who found their perfect
//                 match with HomeNest
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link to="/properties" className="btn btn-primary btn-lg gap-2">
//                   Browse All Properties
//                   <FaArrowRight />
//                 </Link>
//                 <Link to="/register" className="btn btn-outline btn-lg">
//                   Create Free Account
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Back to Top Button */}
//       {showBackToTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 btn btn-primary btn-circle btn-lg shadow-2xl z-50 animate-bounce hover:animate-none transition-all duration-300 group"
//           aria-label="Back to top"
//         >
//           <FaArrowUp className="text-xl group-hover:scale-125 transition-transform" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default Home;

// src/Pages/Home.jsx - Enhanced Version with Dynamic Data (Part 1 of 2)
// Copy this entire file - it's split into comments for readability

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import AOS from "aos";
import "aos/dist/aos.css";
import PropertyCard from "../Component/PropertyCard";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FaHouse,
  FaMoneyBillWave,
  FaLocationDot,
  FaStar,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaArrowRight,
  FaFire,
  FaTrophy,
} from "react-icons/fa6";
import { FaArrowUp, FaCheckCircle, FaClock, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalReviews: 0,
    verified: 98,
    support: "24/7",
    activeUsers: 12000,
  });
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [trendingProperties, setTrendingProperties] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    fetchAllData();
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [propertiesRes, statsRes, categoriesRes, testimonialsRes] =
        await Promise.all([
          axios.get("https://home-nest-server-10.vercel.app/getServices"),
          axios.get("https://home-nest-server-10.vercel.app/api/stats"),
          fetchCategories(),
          fetchTestimonials(),
        ]);
      setProperties(propertiesRes.data.slice(0, 6));
      const sorted = [...propertiesRes.data].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );
      setTrendingProperties(sorted.slice(0, 4));
      setStats({
        totalProperties:
          statsRes.data.totalProperties || propertiesRes.data.length,
        totalReviews: statsRes.data.totalReviews || 0,
        verified: statsRes.data.verified || 98,
        support: statsRes.data.support || "24/7",
        activeUsers: statsRes.data.activeUsers || 12000,
      });
      setCategories(categoriesRes);
      setTestimonials(testimonialsRes);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://home-nest-server-10.vercel.app/allServices"
      );
      const props = response.data.properties || [];
      const categoryCount = {};
      props.forEach((p) => {
        const cat = p.category || "other";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
      const categoryIcons = {
        residential: "🏠",
        commercial: "🏢",
        vacation: "🏖️",
        shared: "🚪",
        apartment: "🏘️",
        villa: "🏰",
        studio: "🏠",
        other: "🏡",
      };
      return Object.keys(categoryCount)
        .slice(0, 4)
        .map((cat) => ({
          name: cat.charAt(0).toUpperCase() + cat.slice(1),
          count: categoryCount[cat],
          icon: categoryIcons[cat.toLowerCase()] || "🏠",
        }));
    } catch {
      return [
        { name: "Residential", count: 0, icon: "🏠" },
        { name: "Commercial", count: 0, icon: "🏢" },
      ];
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://home-nest-server-10.vercel.app/allServices"
      );
      const props = response.data.properties || [];
      const allReviews = [];
      props.forEach((p) => {
        if (p.reviews && p.reviews.length > 0) {
          p.reviews.forEach((review) =>
            allReviews.push({ ...review, propertyName: p.name })
          );
        }
      });
      const topReviews = allReviews
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
        .map((review) => ({
          name: review.reviewerName || "Anonymous",
          role: `Review for ${review.propertyName}`,
          text: review.reviewText || "Great experience!",
          rating: review.rating || 5,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.reviewerName}`,
        }));
      return topReviews.length > 0 ? topReviews : [];
    } catch {
      return [];
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    axios
      .post("https://home-nest-server-10.vercel.app/api/newsletter", { email })
      .then(() => toast.success(`Thank you! Updates sent to: ${email}`))
      .catch(() => toast.info("Thanks for subscribing!"))
      .finally(() => {
        setSubscribing(false);
        setEmail("");
      });
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  ];

  const statsData = [
    {
      value:
        stats.totalProperties > 0
          ? `${(stats.totalProperties / 1000).toFixed(1)}K+`
          : "5K+",
      label: "Properties",
      icon: <FaHouse />,
      color: "text-primary",
    },
    {
      value: `${(stats.activeUsers / 1000).toFixed(1)}K+`,
      label: "Users",
      icon: <FaUsers />,
      color: "text-secondary",
    },
    {
      value: `${stats.verified}%`,
      label: "Verified",
      icon: <FaShieldAlt />,
      color: "text-success",
    },
    {
      value: stats.support,
      label: "Support",
      icon: <FaClock />,
      color: "text-accent",
    },
  ];

  const whyChooseUs = [
    {
      icon: <FaShieldAlt className="w-9 h-9" />,
      title: "100% Verified",
      desc: "Every property manually verified.",
      color: "text-success",
    },
    {
      icon: <FaMoneyBillWave className="w-9 h-9" />,
      title: "Best Prices",
      desc: "Direct deals with owners.",
      color: "text-primary",
    },
    {
      icon: <FaHeadset className="w-9 h-9" />,
      title: "24/7 Support",
      desc: "Dedicated support anytime.",
      color: "text-accent",
    },
    {
      icon: <FaTrophy className="w-9 h-9" />,
      title: "Top Rated",
      desc: "Rated #1 by thousands.",
      color: "text-warning",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Search & Filter",
      desc: "Find your perfect match.",
      icon: <FaHouse className="w-8 h-8" />,
    },
    {
      step: "02",
      title: "Connect",
      desc: "Chat with owners directly.",
      icon: <FaUsers className="w-8 h-8" />,
    },
    {
      step: "03",
      title: "Move In",
      desc: "Complete and move in.",
      icon: <FaCheckCircle className="w-8 h-8" />,
    },
  ];

  const faqs = [
    {
      q: "Is listing free?",
      a: "Yes! Completely free with no hidden charges.",
    },
    {
      q: "How to contact owners?",
      a: "Click 'Contact Owner' after logging in.",
    },
    {
      q: "Are properties verified?",
      a: "Yes! Every property is manually verified.",
    },
    {
      q: "Can I schedule visits?",
      a: "Yes! Contact owners to arrange viewings.",
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero */}
      <section className="relative mb-16 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[500px] md:h-[600px]"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full">
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`Hero ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 flex items-center justify-center">
                  <div
                    className="text-center px-4 max-w-5xl"
                    data-aos="fade-up"
                  >
                    <div className="inline-block mb-4 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                      <span className="text-primary-content text-sm font-semibold">
                        🎉 {stats.totalProperties}+ Properties
                      </span>
                    </div>
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
                      Find Your Perfect Home
                    </h1>
                    <p className="text-gray-100 text-lg md:text-2xl mb-10">
                      Discover verified properties that match your dreams
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/properties"
                        className="btn btn-primary btn-lg gap-2"
                      >
                        Explore Now <FaArrowRight />
                      </Link>
                      {!user && (
                        <Link to="/register" className="btn btn-outline btn-lg">
                          Join Free
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Stats */}
        <section className="mb-20 -mt-12" data-aos="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl border-2 border-base-200 p-6"
              >
                <div className={`text-4xl mb-2 ${stat.color}`}>{stat.icon}</div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-base-content/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="mb-20" data-aos="fade-up">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Properties</h2>
              <p className="text-base-content/70">Premium listings for you</p>
            </div>
            <Link to="/properties" className="btn btn-primary gap-2">
              View All <FaArrowRight />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-20">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">No properties</div>
          )}
        </section>

        {/* Trending */}
        {trendingProperties.length > 0 && (
          <section className="mb-20" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-12">Top Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {trendingProperties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* Why Us */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl border-2 border-base-200"
              >
                <div className="card-body items-center text-center">
                  <div
                    className={`p-4 bg-base-200 rounded-2xl ${item.color} mb-4`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-base-content/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center pt-12">
                  <div className="absolute -top-6 bg-primary text-primary-content w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xl">{step.title}</h3>
                  <p className="text-base-content/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={i}
                to={`/properties?category=${cat.name.toLowerCase()}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl"
              >
                <div className="card-body items-center text-center">
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold">{cat.name}</h3>
                  <p className="text-sm text-primary">{cat.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="card bg-base-100 shadow-xl border-2">
                  <div className="card-body">
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, idx) => (
                        <FaStar key={idx} className="text-warning" />
                      ))}
                    </div>
                    <p className="italic mb-6">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-base-content/60">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="collapse collapse-plus bg-base-100 shadow-xl"
              >
                <input type="radio" name="faq" defaultChecked={i === 0} />
                <div className="collapse-title font-semibold">{faq.q}</div>
                <div className="collapse-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-20">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-2xl">
            <div className="card-body items-center text-center p-12">
              <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="mb-8">Get latest listings and exclusive deals</p>
              <div className="flex gap-3 w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input flex-1 text-base-content"
                  disabled={subscribing}
                />
                <button
                  onClick={handleSubscribe}
                  className="btn btn-secondary"
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 btn btn-primary btn-circle shadow-2xl"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default Home;
