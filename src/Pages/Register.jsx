// import React, { useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { auth } from "../Firebase/Firebase.config";
// import { FaEye, FaHome, FaGoogle, FaLock, FaEnvelope, FaUser, FaImage } from "react-icons/fa";
// import { IoEyeOff } from "react-icons/io5";
// import Footer from "../Component/Footer";
// import Navbar from "../Component/Navbar";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const googleProvider = new GoogleAuthProvider();

//   const validatePassword = (password) => {
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       return false;
//     }
    
//     if (!/[A-Z]/.test(password)) {
//       toast.error("Include at least one uppercase letter");
//       return false;
//     }
    
//     if (!/[a-z]/.test(password)) {
//       toast.error("Include at least one lowercase letter");
//       return false;
//     }
    
//     return true;
//   };

//   const handleRegistration = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     const userName = e.target.name.value;
//     const userEmail = e.target.email.value;
//     const userPassword = e.target.password.value;
//     const userPhoto = e.target.photoUrl.value;

//     if (!validatePassword(userPassword)) {
//       setIsLoading(false);
//       return;
//     }

//     createUserWithEmailAndPassword(auth, userEmail, userPassword)
//       .then((result) => {
//         const newUser = result.user;
//         return updateProfile(newUser, {
//           displayName: userName || "",
//           photoURL: userPhoto || "",
//         });
//       })
//       .then(() => {
//         toast.success("Welcome to HomeNest! Your account has been created.");
//         navigate("/");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const handleGoogleRegistration = () => {
//     setIsLoading(true);
//     signInWithPopup(auth, googleProvider)
//       .then(() => {
//         toast.success("Welcome to HomeNest!");
//         navigate("/");
//       })
//       .catch((error) => {
//         toast.error(error.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   return (
//     <div>
//       <Navbar />
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <FaHome className="text-white text-2xl mr-2" />
//             <h1 className="text-2xl font-bold text-white">HomeNest</h1>
//           </div>
//           <h2 className="text-xl font-semibold text-white">Create Your Account</h2>
//           <p className="text-blue-100 mt-2">Join thousands of property enthusiasts</p>
//         </div>

//         <div className="p-8">
//           <form onSubmit={handleRegistration} className="space-y-6">
//             {/* Name Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="name"
//                   placeholder="Enter your full name"
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Photo URL Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Profile Photo URL <span className="text-gray-400 text-sm">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaImage className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="photoUrl"
//                   type="url"
//                   placeholder="https://example.com/photo.jpg"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   name="password"
//                   type={isPasswordVisible ? "text" : "password"}
//                   placeholder="Create a strong password"
//                   required
//                   className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                 >
//                   {isPasswordVisible ? <IoEyeOff className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Must be 6+ characters with uppercase and lowercase letters
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-blue-800 to-teal-500 hover:from-blue-300 hover:to-teal-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
//             >
//               {isLoading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
//                   Creating Account...
//                 </div>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center">
//             <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
//             <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">Or sign up with</span>
//             <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
//           </div>

//           {/* Google Sign Up */}
//           <button
//             onClick={handleGoogleRegistration}
//             disabled={isLoading}
//             className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium shadow-md hover:shadow-lg transition-all duration-200"
//           >
//             <FaGoogle className="text-red-500" />
//             Continue with Google
//           </button>

//           {/* Login Link */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("/login")}
//                 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div/>
//     </div>  
//     <Footer />
//     </div>
    
    
//   );
// };

// export default SignUp; 

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
import { FaEye, FaHome, FaGoogle, FaLock, FaEnvelope, FaUser, FaImage } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();

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

  const handleRegistration = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const userName = e.target.name.value;
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const userPhoto = e.target.photoUrl.value;

    if (!validatePassword(userPassword)) {
      setIsLoading(false);
      return;
    }

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        const newUser = result.user;
        return updateProfile(newUser, {
          displayName: userName || "",
          photoURL: userPhoto || "",
        });
      })
      .then(() => {
        toast.success("Welcome to HomeNest! Your account has been created.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleRegistration = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Welcome to HomeNest!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
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
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-base-100 rounded-2xl shadow-2xl overflow-hidden border border-base-300">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <FaHome className="text-primary-content text-2xl mr-2" />
              <h1 className="text-2xl font-bold text-primary-content">HomeNest</h1>
            </div>
            <h2 className="text-xl font-semibold text-primary-content">Create Your Account</h2>
            <p className="text-primary-content/80 mt-2">Join thousands of property enthusiasts</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleRegistration} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Photo URL Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Profile Photo URL <span className="text-base-content/50 text-sm">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaImage className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    name="photoUrl"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-base-content">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    className="input input-bordered w-full pl-10 pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/60 hover:text-base-content"
                  >
                    {isPasswordVisible ? <IoEyeOff className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-base-content/60 mt-1">
                  Must be 6+ characters with uppercase and lowercase letters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-base-content/60">Or sign up with</div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleRegistration}
              disabled={isLoading}
              className="btn btn-outline w-full gap-2"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-base-content/70">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary hover:text-primary-focus font-semibold transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;