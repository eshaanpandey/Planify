import axios from 'axios';

const API_URL = 'https://planify-tl08.onrender.com/api/organizations';

const getAllOrganizations = async () => {
  const response = await axios.get(`${API_URL}/`);
  console.log(response.data);
  return response;
};

const getOrganizationDetails = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response;
};

const organizationService = {
  getAllOrganizations,
  getOrganizationDetails,
};

export default organizationService;
