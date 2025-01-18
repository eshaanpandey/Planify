import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlices";
import LogoutButton from "../Shared/LogoutButton";

const NavbarElement = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <ul className="flex justify-center gap-8 text-gray-700">
      <li>
        <a href={`/${role}/dashboard`} className="hover:text-blue-500">
          Dashboard
        </a>
      </li>

      {role === "admin" && (
        <>
        <li>
          <a href="/admin/plans" className="hover:text-blue-500">
            Plans
          </a>
        </li>
        <li>
            <a href="/admin/orders" className="hover:text-blue-500">
              Order History
            </a>
          </li>
        </>
      )}
      {role === "superadmin" && (
        <>
          <li>
            <a href="/superadmin/plans" className="hover:text-blue-500">
              Manage Plans
            </a>
          </li>
          <li>
            <a href="/superadmin/organizations" className="hover:text-blue-500">
              Organizations
            </a>
          </li>
          <li>
            <a href="/superadmin/orders" className="hover:text-blue-500">
              Order History
            </a>
          </li>
        </>
      )}

      <li>
        <LogoutButton onClick={handleLogout} />
      </li>
    </ul>
  );
};

export default NavbarElement;
