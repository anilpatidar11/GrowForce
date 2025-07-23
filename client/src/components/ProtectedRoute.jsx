import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {   //children ka matlab hai wo component jo tum is wrapper ke andar pass kar rahe ho
//   <ProtectedRoute>
//   <CreateEmp />
  // </ProtectedRoute>
  
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
