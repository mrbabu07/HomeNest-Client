
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { miyagi } from "ldrs";

miyagi.register();

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <l-miyagi
          size="35"
          stroke="3.5"
          speed="0.9"
          color="#facc15" 
        ></l-miyagi>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
