import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleRoute = ({ role, children }) => {
  const { user } = useSelector((state) => state.auth) || {};
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const currentUser = user || storedUser;

  if (!currentUser || currentUser.role !== role) {
    console.warn("unauthorized access in RoleRoutes");
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleRoute;
