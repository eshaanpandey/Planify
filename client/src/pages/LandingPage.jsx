import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'superadmin') return <Navigate to="/superadmin/dashboard" replace />;
    if (user.role === 'user') return <Navigate to="/user/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to the Application!</h1>
      <p className="text-lg text-gray-600 mb-8">Please log in to access your dashboard.</p>
      <Link
        to="/user/login"
        className="text-blue-600 border border-blue-600 rounded-md px-6 py-2 text-sm font-medium transition duration-200 hover:bg-blue-600 hover:text-white"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default LandingPage;
