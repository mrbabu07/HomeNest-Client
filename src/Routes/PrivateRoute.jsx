import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Loading from "../Component/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-center p-10"><Loading/></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;