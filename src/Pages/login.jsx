import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaHome, FaGoogle, FaLock, FaEnvelope } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const googleProvider = new GoogleAuthProvider();

const Signin = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle regular email/password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;

    if (!emailValue || !passwordValue) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        toast.success("Welcome back to HomeNest!");
        navigate("/");
      })
      .catch((error) => {
        const errorMsg = error.message.includes("wrong-password")
          ? "Incorrect password. Please try again."
          : "Could not sign you in. Please check your credentials.";
        toast.error(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle Google sign-in
  const handleGoogleLogin = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Welcome to HomeNest!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google sign-in failed. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
      
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <FaHome className="text-white text-2xl mr-2" />
            <h1 className="text-2xl font-bold text-white">HomeNest</h1>
          </div>
          <h2 className="text-xl font-semibold text-white">Welcome Back</h2>
          <p className="text-blue-100 mt-2">Sign in to your account</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  ref={emailInputRef}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {isPasswordVisible ? <IoEyeOff className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(`/forgot-password?email=${emailInputRef.current?.value || ""}`)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-800 to-teal-500 hover:from-blue-300 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
    </div>
    
    
  );
};

export default Signin;