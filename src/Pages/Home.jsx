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

// ✅ Correct FA6 Icons (FaHome does not exist in fa6)
import {
  FaHouse,
  FaMoneyBillWave,
  FaLocationDot,
  FaStar
} from "react-icons/fa6";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const { data } = await axios.get(`${API_BASE_URL}/api/properties`, {
        params: { sort: "dateAdded", order: "desc" }
      });

      setProperties(data.slice(0, 6));
    } catch (err) {
      setError("Failed to load featured properties.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
  ];

  const whyChooseUs = [
    {
      icon: <FaHouse className="w-9 h-9 text-blue-500" />,
      title: "Verified Listings",
      desc: "Every property is manually verified for quality."
    },
    {
      icon: <FaMoneyBillWave className="w-9 h-9 text-green-500" />,
      title: "Best Market Rates",
      desc: "Get competitive rates from owners & top agents."
    },
    {
      icon: <FaLocationDot className="w-9 h-9 text-yellow-500" />,
      title: "Prime Locations",
      desc: "Discover homes in the most desired areas."
    },
    {
      icon: <FaStar className="w-9 h-9 text-purple-500" />,
      title: "Trusted Platform",
      desc: "Thousands have found homes with HomeNest."
    }
  ];

  const howItWorks = [
    { step: "01", title: "Search", desc: "Filter by location, price & type." },
    { step: "02", title: "Connect", desc: "Message owners or agents directly." },
    { step: "03", title: "Move In", desc: "Schedule visits & finalize your home." }
  ];

  const insights = [
    {
      title: "Dhaka Property Boom",
      summary: "Residential demand rising in Gulshan & Banani."
    },
    {
      title: "Commercial Growth",
      summary: "Office rentals up 20% in Dhanmondi this year."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Slider */}
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
              <img src={img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
                  Find Your Dream Home with HomeNest
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Properties */}
      <section className="mb-16" data-aos="fade-up">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Properties
          </h2>
          <Link
            to="/properties"
            className="text-blue-600 hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={{ ...p, showPostedBy: true }} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section
        className="mb-16 bg-gray-50 p-10 rounded-xl"
        data-aos="fade-right"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Why Choose HomeNest?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="text-center"
              data-aos="zoom-in"
              data-aos-delay={i * 120}
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((step, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow text-center"
              data-aos="fade-down"
            >
              <div className="text-4xl font-bold text-blue-600 mb-3">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Insights */}
      <section data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Latest Market Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border shadow-sm"
              data-aos="flip-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.summary}</p>
              <button className="mt-3 text-blue-600 text-sm hover:underline">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
