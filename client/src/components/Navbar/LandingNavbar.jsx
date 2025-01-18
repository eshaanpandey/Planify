import React from "react";
import LogoutButton from "../Shared/LogoutButton";

const LandingNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <span>Welcome</span>
      <div className="space-x-4">
        <button className="text-white border border-transparent hover:border-white transition-all">Login</button>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default LandingNavbar;
