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
} from "react-icons/fa6";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    fetchFeaturedProperties();
  }, []);

  // Load Featured Properties - EXACT SAME FUNCTIONALITY
  const fetchFeaturedProperties = () => {
    axios
      .get("http://localhost:3000/getServices")
      .then((res) => {
        setProperties(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load properties.");
        setLoading(false);
      });
  };

  // Hero Images - same images
  const heroImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
  ];

  // Why Choose Us - same content
  const whyChooseUs = [
    {
      icon: <FaHouse className="w-9 h-9" />,
      title: "Verified Listings",
      desc: "Every property is checked manually.",
    },
    {
      icon: <FaMoneyBillWave className="w-9 h-9" />,
      title: "Best Market Rates",
      desc: "Affordable rates directly from owners.",
    },
    {
      icon: <FaLocationDot className="w-9 h-9" />,
      title: "Prime Locations",
      desc: "Find homes in the most desired areas.",
    },
    {
      icon: <FaStar className="w-9 h-9" />,
      title: "Trusted Platform",
      desc: "Thousands of happy users.",
    },
  ];

  // How It Works Steps - same content
  const howItWorks = [
    { step: "01", title: "Search", desc: "Filter by location, type & price." },
    { step: "02", title: "Connect", desc: "Chat with owners or agents." },
    { step: "03", title: "Move In", desc: "Visit, finalize & shift." },
  ];

  // Market Insights - same content
  const insights = [
    {
      title: "Dhaka Property Boom",
      summary: "Demand rising rapidly in Gulshan & Banani.",
    },
    {
      title: "Commercial Spaces",
      summary: "Office rentals up by 20% this year.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HERO SLIDER - Fixed width container */}

      <div
        className="relative mb-14 rounded-2xl overflow-hidden shadow-xl"
        data-aos="zoom-in"
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[430px]"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`Property ${i + 1}`}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                    Find Your Dream Home with HomeNest
                  </h1>
                  <p className="text-gray-200 text-lg md:text-xl mb-6">
                    Discover perfect properties that match your lifestyle
                  </p>
                  <Link
                    to="/properties"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                  >
                    Explore Properties
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* FEATURED PROPERTIES - Fixed width */}

      <section className="mb-16" data-aos="fade-up">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
              Featured Properties
            </h2>
            <p className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-2">
              Handpicked selection of premium properties
            </p>
          </div>
          <Link
            to="/properties"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 dark:text-red-400 py-12">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard
                key={p._id}
                property={{ ...p, showPostedBy: true }}
              />
            ))}
          </div>
        )}
      </section>

      {/* WHY CHOOSE US - Fixed width with theme colors */}

      <section
        className="mb-16 bg-gray-50 dark:bg-gray-800 p-10 rounded-xl"
        data-aos="fade-right"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Choose HomeNest?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="text-center bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl">
                  <div className="text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - Fixed width with theme support */}

      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-aos="fade-up">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8">
          Latest Market Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.summary}
              </p>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mt-16 bg-blue-600 dark:bg-gray-800 rounded-2xl p-12 text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied homeowners who found their perfect match
          with HomeNest
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/properties"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Browse All Properties
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
