import axios from 'axios';

const API_URL = 'http://localhost:5002/api/plans';

const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

const getAllPlans = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

const createPlan = async (planData) => {
    const token = getAuthToken().replace(/['"]+/g, '');
  const response = await axios.post(API_URL, planData, {
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
  return response.data;
};

const updatePlan = async (id, planData) => {
    const token = getAuthToken().replace(/['"]+/g, '');
  const response = await axios.put(`${API_URL}/${id}`, planData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    });
  return response.data;
};

const deletePlan = async (id) => {
    const token = getAuthToken().replace(/['"]+/g, '');;
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
  return response.data;
};

const planService = { getAllPlans, createPlan, updatePlan, deletePlan };
export default planService;
