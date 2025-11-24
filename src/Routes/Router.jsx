import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Home from "../Pages/Home";
import AllProperties from "../Pages/AllProperties";
import AddProperty from "../Pages/AddProperty";
import MyProperties from "../Pages/MyProperties";
import MyRatings from "../Pages/MyRatings";
import PropertyDetails from "../Pages/PropertyDetails";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import UpdateProperty from "../Pages/UpdateProperty";

const MainLayout = () => (
  <>
    <Navbar />
    <main className="min-h-[calc(100vh-140px)]">
      <Outlet />
    </main>
    <Footer />
  </>
);

const AuthLayout = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50">
    <Outlet />
  </main>
);

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/properties", element: <AllProperties /> },
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
        path: "/update-property/:id",
        element: (
          <PrivateRoute>
            <UpdateProperty />
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
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);