import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

// In this comp we will check if the user is login or not.

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext); // if its true
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
