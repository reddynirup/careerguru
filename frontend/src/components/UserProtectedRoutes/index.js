import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProtectedRoutes = () => {
  const userToken = Cookies.get('user_jwt_token');

  // If the cookie is present, it's a valid user otherwise, navigate to the login page
  return userToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserProtectedRoutes;