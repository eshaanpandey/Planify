import React from 'react';
import SuperAdminNavbar from '../components/Navbar/SuperAdminNavbar';
import Footer from '../components/Shared/Footer';

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SuperAdminNavbar role="superadmin" />
      <main className="p-8 bg-white min-h-[calc(100vh-150px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SuperAdminLayout;
