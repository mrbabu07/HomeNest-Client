import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  // Validate password requirements
  const validatePassword = (password) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    
    if (!/[A-Z]/.test(password)) {
      toast.error("Include at least one uppercase letter");
      return false;
    }
    
    if (!/[a-z]/.test(password)) {
      toast.error("Include at least one lowercase letter");
      return false;
    }
    
    return true;
  };

  // Handle registration with email and password
  const handleRegistration = (e) => {
    e.preventDefault();
    
    const userName = e.target.name.value;
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const userPhoto = e.target.photoUrl.value;

    // Check if password meets requirements
    if (!validatePassword(userPassword)) {
      return;
    }

    // Create the user account
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        const newUser = result.user;
        
        // Update user profile with name and photo
        return updateProfile(newUser, {
          displayName: userName || "",
          photoURL: userPhoto || "",
        });
      })
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Handle Google sign-in
  const handleGoogleRegistration = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signed in with Google");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleRegistration} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>

        {/* Photo URL Field */}
        <div>
          <label className="block text-gray-300 mb-1">Photo URL</label>
          <input
            name="photoUrl"
            type="url"
            placeholder="https://your-photo.com"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            name="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter password"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[42px] cursor-pointer text-gray-400"
          >
            {isPasswordVisible ? <FaEye /> : <IoEyeOff />}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-black rounded font-semibold hover:bg-green-400 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Google Sign-In Option */}
      <button
        onClick={handleGoogleRegistration}
        className="w-full py-2 mt-4 border border-gray-600 rounded hover:bg-gray-800 transition"
      >
        Continue with Google
      </button>

      {/* Link to Login */}
      <p className="text-center mt-4 text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-yellow-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUp;