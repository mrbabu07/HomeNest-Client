// src/Pages/Privacy.jsx
import React from "react";


const Privacy = () => {
  return (
    <>
      
      <div className="min-h-screen bg-base-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-base-100 rounded-2xl shadow border border-base-200 p-8">
            <h1 className="text-3xl font-bold text-base-content mb-6">Privacy Policy</h1>
            
            <div className="prose prose-base-100 max-w-none">
              <p className="text-base-content/80 mb-6">
                Last updated: January 02, 2026
              </p>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">1. Introduction</h2>
              <p className="text-base-content/80 mb-4">
                HomeNest ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our property listing platform.
              </p>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-2 text-base-content/80 mb-4">
                <li><strong>Account Information</strong>: When you register, we collect your name, email, and profile picture (via Firebase Authentication).</li>
                <li><strong>Property Listings</strong>: When you add a property, we store name, description, location, price, images, and contact details.</li>
                <li><strong>Reviews</strong>: Your reviews include name, rating, and comments (linked to your email).</li>
              </ul>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2 text-base-content/80 mb-4">
                <li>To display property listings to other users</li>
                <li>To enable communication between property owners and interested parties</li>
                <li>To improve our services and user experience</li>
                <li>To comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">4. Data Security</h2>
              <p className="text-base-content/80 mb-4">
                We implement appropriate technical and organizational measures to protect your data. 
                All authentication is handled securely by Firebase Auth, and property data is stored in MongoDB Atlas with encryption at rest and in transit.
              </p>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">5. Your Rights</h2>
              <p className="text-base-content/80 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-base-content/80 mb-4">
                <li>Access, update, or delete your personal information</li>
                <li>Delete your property listings at any time</li>
                <li>Request deletion of your account</li>
              </ul>

              <h2 className="text-2xl font-semibold text-base-content mt-8 mb-4">6. Contact Us</h2>
              <p className="text-base-content/80">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="text-base-content/80 mt-2">
                <strong>Email:</strong> <a href="mailto:web@programming-hero.com" className="link link-primary">web@programming-hero.com</a><br />
                <strong>Address:</strong> Level-4, 34, Awal Centre, Banani, Dhaka, Bangladesh
              </p>

              <div className="mt-8 pt-6 border-t border-base-200">
                <p className="text-sm text-base-content/70 italic">
                  This Privacy Policy is for demonstration purposes as part of a student project. 
                  No real user data is collected beyond what is necessary for the platform's functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Privacy;