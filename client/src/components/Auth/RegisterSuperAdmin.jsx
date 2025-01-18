import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerSuperAdmin } from "../../redux/slices/authSlices";
import { useNavigate } from "react-router-dom";

const RegisterSuperAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, role: "superadmin" };
    const response = await dispatch(registerSuperAdmin(payload));
    if (response.meta.requestStatus === "fulfilled") {
      const { role } = response.payload.user;
      if (role === "superadmin") navigate("/superadmin/dashboard");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Register as SuperAdmin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
          <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/user/login")}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterSuperAdmin;
