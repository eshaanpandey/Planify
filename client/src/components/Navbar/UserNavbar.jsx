import React from "react";
import NavbarElement from "./NavbarElement";

const UserNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-200">
      <h1 className="text-xl font-semibold text-gray-700">User Dashboard</h1>

      <div className="flex items-center justify-center gap-8">
        <NavbarElement role="user" />
      </div>
    </nav>
  );
};

export default UserNavbar;
