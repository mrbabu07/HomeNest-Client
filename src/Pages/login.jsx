import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";

const googleProvider = new GoogleAuthProvider();

const Signin = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Handle regular email/password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;

    // Make sure both fields have values
    if (!emailValue || !passwordValue) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Try to sign in with Firebase
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(() => {
        toast.success("Welcome back! You're now signed in.");
        navigate("/");
      })
      .catch((error) => {
        // Show a friendly error message
        const errorMsg = error.message.includes("wrong-password")
          ? "Incorrect password. Please try again."
          : "Could not sign you in. Please check your credentials.";
        
        toast.error(errorMsg);
      });
  };

  // Handle Google sign-in
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Google sign-in successful! Redirecting...");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white shadow-2xl rounded-2xl mt-10 border border-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>

      <form onSubmit={handleEmailLogin}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            ref={emailInputRef}
            className="w-full border p-2 rounded bg-gray-800 text-white"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            className="w-full border p-2 rounded bg-gray-800 text-white"
            placeholder="Enter your password"
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-[42px] cursor-pointer text-gray-400"
          >
            {isPasswordVisible ? <FaEye /> : <IoEyeOff />}
          </span>
        </div>

        {/* Forgot Password Link */}
        <button
          type="button"
          onClick={() =>
            navigate(`/forgot-password?email=${emailInputRef.current?.value || ""}`)
          }
          className="text-sm text-yellow-400 hover:underline mb-4"
        >
          Forgot Password?
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400"
        >
          Sign In
        </button>
      </form>

      {/* Google Sign In Option */}
      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 border border-gray-600 rounded-md hover:bg-gray-800"
        >
          Continue with Google
        </button>
      </div>

      {/* Link to Sign Up */}
      <div className="mt-4 text-center text-gray-400">
        Don't have an account?{" "}
        <a href="/Register" className="text-yellow-400 hover:underline">
          Create one
        </a>
      </div>
    </div>
  );
};

export default Signin;