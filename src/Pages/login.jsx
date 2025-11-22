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
  const emailRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Handle Email + Password Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Welcome back! You're now signed in.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(
          error.message.includes("wrong-password")
            ? "Incorrect password. Please try again."
            : "Could not sign you in. Please check your credentials."
        );
      });
  };

  //  Handle Password Reset
  // const handleForgetPassword = () => {
  //   const email = emailRef.current?.value;

  //   if (!email) {
  //     toast.error("Please enter your email above first.");
  //     return;
  //   }

  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       toast.success("Password reset link has been sent to your email.");
  //     })
  //     .catch(() => {
  //       toast.error("Couldn't send reset email. Please try again.");
  //     });
  // };

  //  Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Google sign-in successful! Redirecting...");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white shadow-2xl rounded-2xl mt-10 border border-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-center">Sign In</h2>

      <form onSubmit={handleSignIn}>
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="w-full border p-2 rounded bg-gray-800 text-white"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full border p-2 rounded bg-gray-800 text-white"
            placeholder="Enter your password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[42px] cursor-pointer text-gray-400"
          >
            {showPassword ? <FaEye /> : <IoEyeOff />}
          </span>
        </div>

        {/* Forget Password Button */}
        <button
          type="button"
          onClick={() =>
            navigate(`/forgot-password?email=${emailRef.current?.value || ""}`)
          }
          className="text-sm text-yellow-400 hover:underline mb-4"
        >
          Forgot Password?
        </button>

        {/* Main Sign In Button */}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400"
        >
          Sign In
        </button>
      </form>

      {/* Google Sign In */}
      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 border border-gray-600 rounded-md hover:bg-gray-800"
        >
          Continue with Google
        </button>
      </div>

      {/* Redirect to Sign Up */}
      <div className="mt-4 text-center text-gray-400">
        Don’t have an account?{" "}
        <a href="/signup" className="text-yellow-400 hover:underline">
          Create one
        </a>
      </div>
    </div>
  );
};

export default Signin;
