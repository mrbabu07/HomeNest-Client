// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
            <p>mrjabedpuc@gmail.com</p>
            <p>+8801521....... PET-CARE</p>
            <p>123 Chittagong Chawkbazar</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-yellow-400">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">Facebook</a>
              <a href="#" className="hover:text-yellow-400">Twitter</a>
              <a href="#" className="hover:text-yellow-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          &copy; {new Date().getFullYear()} PetWinterCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;