// src/Components/Loading.jsx
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ message = "Loading...", size = "lg" }) => {
  // Size classes for spinner and text
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
      <FaSpinner className={`animate-spin text-primary ${sizeClasses[size] || sizeClasses.lg} mb-4`} />
      <p className={`text-base-content/70 ${textClasses[size] || textClasses.lg}`}>
        {message}
      </p>
    </div>
  );
};

export default Loading;