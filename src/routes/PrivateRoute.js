import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(currentUser.email);
  console.log(children.type.name);
  return !currentUser ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
