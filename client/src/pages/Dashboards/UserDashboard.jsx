import React from "react";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to your Dashboard, {user.name}</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Organization</h3>
        <p className="text-gray-600">Organization: {user.organization}</p>
        <p className="text-gray-600">Current Plan: {user.plan}</p>
        <p className="text-gray-600">Plan Expiry: {user.planExpiry}</p>
        <p className="text-gray-600">Active Users: {user.activeUsers}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
