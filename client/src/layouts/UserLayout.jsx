import React from 'react';
import UserNavbar from '../components/Navbar/UserNavbar';
import Footer from '../components/Shared/Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserNavbar role="user" />
      <main className="p-8 bg-white min-h-[calc(100vh-150px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
