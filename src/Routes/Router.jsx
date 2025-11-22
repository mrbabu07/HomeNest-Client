// Routes/Router.jsx
import React from 'react'; // Import React for JSX
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from '../Component/Navbar'; // আপনার আপডেটেড Navbar
import Footer from '../Component/Footer'; // আপনার আগের Footer
import Home from '../Pages/Home'; // আপনার আপডেটেড Home
import AllProperties from '../Pages/AllProperties'; // আপনার আপডেটেড AllProperties
import AddProperty from '../Pages/AddProperty';
import MyProperties from '../Pages/MyProperties';
import MyRatings from '../Pages/MyRatings';
import Login from '../Pages/Login'; // আপনার আপডেটেড Login
import Register from '../Pages/Register'; // আপনার আপডেটেড Register
import PropertyDetails from '../Pages/PropertyDetails';
import NotFound from '../Pages/NotFound';
import PrivateRoute from './PrivateRoute'; // আপনার নতুন PrivateRoute
// AuthProvider এখন main.jsx এ রাখা হয়েছে, তাই এখানে দরকার নেই

// Layout Component for routes that need Navbar and Footer
const MainLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow">
      <Outlet /> {/* This renders the matched child route's element */}
    </main>
    <Footer />
  </>
);

// Layout Component for routes that don't need Navbar and Footer (e.g., Login, Register)
const AuthLayout = () => (
  <>
    {/* Optionally, you could have a minimal header/footer for auth pages, or none at all */}
    {/* For simplicity, we'll render just the Outlet here, assuming Login/Register handle their own minimal layout */}
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Outlet />
    </main>
  </>
);

// Define the router configuration
export const router = createBrowserRouter([
  // Routes with Navbar and Footer
  {
    element: <MainLayout />, // Apply MainLayout to routes needing Navbar/Footer
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/properties",
        element: <AllProperties />,
      },
      {
        path: "/add-property",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
      {
        path: "/property/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "*", // Catch-all for 404
        element: <NotFound />,
      },
    ],
  },
  // Routes without Navbar and Footer (like Login/Register)
  {
    element: <AuthLayout />, // Apply AuthLayout to routes without Navbar/Footer
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

// We don't export the wrapped version here anymore, just the router configuration
// export default AuthenticatedRouter; // This line is removed