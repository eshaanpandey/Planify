import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlices";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 transition-all"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
