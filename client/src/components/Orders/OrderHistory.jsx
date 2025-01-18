import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPayments, fetchPaymentsByOrganization } from '../../services/paymentService';
import { setPayments } from '../../redux/slices/paymentSlices';
import { fetchPlans } from '../../redux/slices/planSlices';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { payments } = useSelector((state) => state.payment);
  const { plans } = useSelector((state) => state.plans);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (user.role === 'admin') {
          const organizationId = user.organizationId;
          const token = getAuthToken().replace(/['"]+/g, '');

          const response = await fetchPaymentsByOrganization(token, organizationId);
          dispatch(setPayments(response));
        } else if (user.role === 'superadmin') {
          const token = getAuthToken().replace(/['"]+/g, '');
          const response = await fetchAllPayments(token);
          dispatch(setPayments(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    const fetchPlansData = async () => {
      dispatch(fetchPlans());
    };

    fetchPayments();
    fetchPlansData();
  }, [user, dispatch]);

  const getPlanName = (planId) => {
    const plan = plans.find((p) => p._id === planId);
    return plan ? plan.name : 'Unknown Plan';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment History</h2>
        {Array.isArray(payments) && payments.length > 0 ? (
          <ul className="space-y-4">
            {payments.map((payment) => (
              <li key={payment._id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200">
                <p className="text-lg font-medium text-gray-700">Plan: <span className="text-indigo-600">{getPlanName(payment.planId)}</span></p>
                <p className="text-md text-gray-600">Status: <span className={`font-semibold ${payment.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{payment.status}</span></p>
                <p className="text-md text-gray-600">Amount: <span className="font-bold text-gray-800">INR {payment.amount}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600">No payment history available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
