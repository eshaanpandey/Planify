import React from "react";
import NavbarElement from "./NavbarElement";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

const AdminNavbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-blue-100">
      <h1 className="text-xl font-semibold text-blue-800">Admin Dashboard</h1>

      <div className="flex items-center justify-center gap-8">
        <NavbarElement role="admin" />
      </div>

      <div className="flex items-center gap-6">
        <Link to="/admin/cart">
          <div className="relative flex items-center">
            <FiShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
