// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 border-t border-gray-800 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">HomeNest</h3>
            <p className="text-sm leading-relaxed">
              Your trusted partner in finding dream homes, rentals, and commercial 
              properties across Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-blue-400 transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/add-property" className="hover:text-blue-400 transition">
                  Post a Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                support@homenest.com
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-400" />
                +8801912-345678
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-blue-400 mt-1" />
                Gulshan, Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-5 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaXTwitter size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <FaInstagram size={22} />
              </a>
            </div>

            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-blue-400 transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm dark:border-gray-800">
          &copy; {new Date().getFullYear()} HomeNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;