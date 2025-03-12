import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Simulated Authentication Function (Replace with real auth check)
const getUserRole = () => {
  return localStorage.getItem("role"); // Assume role is stored in localStorage
};

const PrivateRoute = ({ role }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to={"/login" }/>;
  }

  if (role !== userRole) {
    return <Navigate to={`/${userRole}/dashboard`} />; // Redirect to correct dashboard
  }

  return <Outlet />;
};

export default PrivateRoute;
