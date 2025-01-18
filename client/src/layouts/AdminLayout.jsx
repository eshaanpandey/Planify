import React from 'react';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Footer from '../components/Shared/Footer';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar role="admin" />
      <main className="p-8 bg-white min-h-[calc(100vh-150px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
