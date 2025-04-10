import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState,useEffect } from 'react'

const ProtectedRoute = ({ user }) => {
  if (user === null) {
    return <Navigate to="/auth" />; // Redirect to login if user is not authenticated
  }
  return <Outlet />; // Render the protected route if user is authenticated
};

export default ProtectedRoute;
