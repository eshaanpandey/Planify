import axios from "axios";

// const API_URL = "http://localhost:5002/api/auth";
const API_URL = "https://planify-tl08.onrender.com/api/auth";

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials);
  return response.data;
};

const registerAdmin = async (data) => {
  const response = await axios.post(`${API_URL}/admin/register`, data);
  return response;
};

const registerSuperAdmin = async (data) => {
  const response = await axios.post(`${API_URL}/superadmin/register`, data);
  return response;
};

const authService = { login, registerAdmin, registerSuperAdmin };

export default authService;
