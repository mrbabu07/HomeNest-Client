
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.config";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photoUrl.value;

    if (password.length < 6) return toast.error("Password must be at least 6 characters long");
    if (!/[A-Z]/.test(password)) return toast.error("Include at least one uppercase letter");
    if (!/[a-z]/.test(password)) return toast.error("Include at least one lowercase letter");

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        return updateProfile(user, {
          displayName: name || "",
          photoURL: photoUrl || "",
        });
      })
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Signed in with Google");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Name</label>
          <input name="name" placeholder="Your Name" required className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input name="email" type="email" placeholder="your@email.com" required className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Photo URL</label>
          <input name="photoUrl" type="url" placeholder="https://your-photo.com" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        </div>

        <div className="relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            required
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] cursor-pointer text-gray-400"
          >
            {showPassword ? <FaEye /> : <IoEyeOff />}
          </span>
        </div>

        <button type="submit" className="w-full py-2 bg-green-500 text-black rounded font-semibold hover:bg-green-400 transition">
          Sign Up
        </button>
      </form>

      <button onClick={handleGoogleSignIn} className="w-full py-2 mt-4 border border-gray-600 rounded hover:bg-gray-800 transition">
        Continue with Google
      </button>

      <p className="text-center mt-4 text-gray-400">
        Already have an account? <a href="/signin" className="text-yellow-400 hover:underline">Login</a>
      </p>
    </div>
  );
};

export default SignUp;