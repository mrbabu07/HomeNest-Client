import AOS from "aos";
import "aos/dist/aos.css";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Context/AuthProvider";
import ErrorBoundary from "./Component/ErrorBoundary";



function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />

      <Toaster position="center-top" reverseOrder={false} />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </StrictMode>
);
