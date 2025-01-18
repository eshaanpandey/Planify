import axios from 'axios';

const API_URL = 'https://planify-tl08.onrender.com/api/payments';

export const createPaymentIntent = async (amount, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/`,
      { amount },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent', error);
    throw error;
  }
};

export const fetchPaymentsByOrganization = async (token, organizationId) => {
  try {
    const response = await axios.get(`${API_URL}/${organizationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};
