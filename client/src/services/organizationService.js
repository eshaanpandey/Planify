import axios from 'axios';

const API_URL = 'http://localhost:5002/api/organizations';

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
