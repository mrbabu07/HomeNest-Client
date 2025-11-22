// Pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper for the slider
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // Swiper modules
import "swiper/css"; // Swiper core styles
import "swiper/css/pagination"; // Swiper pagination styles
import "swiper/css/navigation"; // Swiper navigation styles
import AOS from "aos"; // AOS for animations
import "aos/dist/aos.css";
import { fetchProperties } from "../services/Api"; // Your API service
import PropertyCard from "../Component/PropertyCard"; // Your Property Card component
import {
  FaHome,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa"; // Example icons

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const getFeaturedProperties = async () => {
      try {
        setLoading(true);
        // Fetch properties and sort by dateAdded descending (newest first), limit to 6
        // Note: Server-side sort and limit is preferred. If not available, sort client-side.
        const data = await fetchProperties({
          sort: "dateAdded",
          order: "desc",
        });
        setProperties(data.slice(0, 6)); // Client-side slice for now
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError("Failed to load featured properties.");
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProperties();
  }, []);

  // Slider images (replace with your own relevant images)
  const heroImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80", // Example: Modern house
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80", // Example: Luxury apartment
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80", // Example: Scenic property
  ];

  // Why Choose Us data (static)
  const whyChooseUsItems = [
    {
      icon: <FaHome className="w-8 h-8 text-blue-500" />,
      title: "Wide Selection",
      description:
        "Browse thousands of verified properties for rent and sale across all categories.",
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-green-500" />,
      title: "Best Prices",
      description:
        "Find the best deals and competitive prices directly from owners and agents.",
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8 text-yellow-500" />,
      title: "Easy Location",
      description:
        "Filter properties by precise location, proximity to amenities, and more.",
    },
    {
      icon: <FaStar className="w-8 h-8 text-purple-500" />,
      title: "Trusted Platform",
      description:
        "Verified listings and user reviews ensure a safe and reliable experience.",
    },
  ];

  // Extra Section 1: How It Works
  const howItWorksSteps = [
    {
      step: 1,
      title: "Search",
      description:
        "Browse or search for properties by location, price, and category.",
    },
    {
      step: 2,
      title: "Connect",
      description: "Contact property owners or agents directly.",
    },
    {
      step: 3,
      title: "View",
      description: "Schedule visits and find your perfect home.",
    },
  ];

  // Extra Section 2: Market Insights (Static)
  const marketInsights = [
    {
      title: "Rising Demand in Suburbs",
      summary: "Learn why suburban properties are gaining popularity.",
    },
    {
      title: "Investment Opportunities",
      summary: "Explore the best areas for real estate investment.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Swiper Slider */}
      <div
        className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl"
        data-aos="zoom-in"
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }} // Increased delay
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="h-96 rounded-2xl"
        >
          {heroImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-96 w-full">
                <img
                  src={img}
                  alt={`Hero ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to from-black/60 to-transparent flex items-center justify-center">
                  <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4 drop-shadow-lg">
                    Find Your Dream Home with HomeNest
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Properties Section */}
      <section className="mb-16" data-aos="fade-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Featured Properties
          </h2>
          <Link
            to="/properties"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            See All Properties
          </Link>
        </div>
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading featured properties...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={{ ...property, showPostedBy: true }} // Pass showPostedBy prop
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section (Static) */}
      <div
        className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
        data-aos="fade-right"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Why Choose HomeNest?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUsItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Section 1: How It Works */}
      <div
        className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              data-aos="fade-down"
              data-aos-delay={index * 150}
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Section 2: Market Insights */}
      <section data-aos="fade-up">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Latest Market Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketInsights.map((insight, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              data-aos="flip-left"
              data-aos-delay={index * 100}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {insight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {insight.summary}
              </p>
              <button className="mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline">
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
