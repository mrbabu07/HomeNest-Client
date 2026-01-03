// src/Pages/Contact.jsx
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from "react-icons/fa";
;
import Footer from "../Component/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ডেমো জন্য: শুধু অ্যালার্ট (বাস্তবে Firebase Functions ব্যবহার করবে)
    setTimeout(() => {
      alert(`Thank you, ${name}! We'll contact you soon at ${email}.`);
      setName("");
      setEmail("");
      setMessage("");
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      
      <div className="min-h-screen bg-base-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-base-content mb-4">Contact Us</h1>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Have questions? Our support team is here to help you find your dream home.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-200">
                <h2 className="text-xl font-bold text-base-content mb-6">Our Office</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaMapMarkerAlt className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Address</h3>
                      <p className="text-base-content/80 mt-1">
                        Level-4, 34, Awal Centre, Banani, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaPhone className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Helpline</h3>
                      <p className="text-base-content/80 mt-1">
                        <a href="tel:+8801335106731" className="link link-primary">01335-106731</a> • 
                        <a href="tel:+8801332502004" className="link link-primary ml-2">01332-502004</a>
                      </p>
                      <p className="text-sm text-base-content/70 mt-1">Sat - Thu, 10:00 AM to 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaEnvelope className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Email</h3>
                      <p className="text-base-content/80 mt-1">
                        <a href="mailto:web@programming-hero.com" className="link link-primary">
                          web@programming-hero.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <FaClock className="text-primary text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base-content">Support Hours</h3>
                      <p className="text-base-content/80 mt-1">Saturday to Thursday</p>
                      <p className="text-base-content/80">10:00 AM – 7:00 PM (BST)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map (Static) */}
              <div className="bg-base-100 rounded-2xl overflow-hidden shadow border border-base-200 h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.900783829102!2d90.40704557563997!3d23.791621678688285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a69f7b8e3d%3A0x5d5b0b7b7b7b7b7b!2sAwal%20Centre!5e0!3m2!1sen!2sbd!4v1718123456789!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Awal Centre, Banani"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-base-100 p-6 rounded-2xl shadow border border-base-200">
              <h2 className="text-xl font-bold text-base-content mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="textarea textarea-bordered w-full"
                      placeholder="How can we help you?"
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Contact;