import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { organizationId } = useSelector((state) => state.auth);
  console.log("organization id in admin dashboard: ", organizationId);

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
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

export default AdminDashboard;
