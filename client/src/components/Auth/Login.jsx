import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlices";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const role = parsedUser.role;
      if (role === "admin") navigate("/admin/dashboard");
      if (role === "superadmin") navigate("/superadmin/dashboard");
      if (role === "user") navigate("/user/dashboard");
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Attempting login with:", email, password);
      const result = await dispatch(loginUser({ email, password })).unwrap();
      // console.log("Login result:", result);
      if (result?.user) {
        const role = result.user.role;
        if (role === 'admin') navigate('/admin/dashboard');
        if (role === 'superadmin') navigate('/superadmin/dashboard');
        if (role === 'user') navigate('/user/dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-blue-400">
        <Link to="/admin/register">Register as Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
