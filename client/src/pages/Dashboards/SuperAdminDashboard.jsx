import React from "react";

const SuperAdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Super Admin Dashboard</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Organizations</h3>
        <table className="min-w-full table-auto text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Organization</th>
              <th className="px-4 py-2">Admin</th>
              <th className="px-4 py-2">Active Users</th>
              <th className="px-4 py-2">Plan Expiry</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
