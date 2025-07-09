import axios from 'axios';

const paymentApiUrl = "http://localhost:5002/api/payments";
// const paymentApiUrl = "https://planify-tl08.onrender.com/api/payments";

export const createPaymentIntent = async (amount, token, planId, organizationId, usersPurchased) => {
  try {
    // console.log("amount: ", amount);
    // console.log("token: ", token);
    // console.log("planId: ", planId);
    console.log("organizationId at createPaymentIntent: ", organizationId);
    // console.log("usersPurchased: ", usersPurchased);

    const response = await axios.post(`${paymentApiUrl}/`, { amount, planId, organizationId, usersPurchased }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent', error);
    throw error;
  }
};

export const fetchAllPayments = async (token) => {
  try {
    const response = await axios.get(paymentApiUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const fetchPaymentsByOrganization = async (token, organizationId) => {
  try {
    const response = await axios.get(`${paymentApiUrl}/${organizationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
};
