import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const defaultEmail = params.get("email") || "";

  const [email, setEmail] = useState(defaultEmail);

  const handleReset = () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent. Opening Gmail...");
        window.open("https://mail.google.com", "_blank"); // Gmail redirect
        navigate("/signin"); // redirect back if needed
      })
      .catch((error) => {
        toast.error("Failed to send reset email. Check your email address.");
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white shadow-2xl rounded-2xl mt-10 border border-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-center">Reset Password</h2>

      <label className="block text-gray-300 mb-1">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded bg-gray-800 text-white mb-4"
        placeholder="Enter your email"
      />

      <button
        onClick={handleReset}
        className="w-full py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400"
      >
        Send Reset Link
      </button>
    </div>
  );
};

export default ForgotPassword;