import React from "react";
import NavbarElement from "./NavbarElement";

const SuperAdminNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-green-100">
      <h1 className="text-xl font-semibold text-green-800">SuperAdmin Dashboard</h1>

      <div className="flex items-center justify-center gap-8">
        <NavbarElement role="superadmin" />
      </div>
    </nav>
  );
};

export default SuperAdminNavbar;
