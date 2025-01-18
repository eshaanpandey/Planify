import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPaymentsByOrganization } from '../../services/paymentService';

const OrderList = () => {
  const [payments, setPayments] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPayments = async () => {
      if (user && user.role === 'admin') {
        try {
          const response = await fetchPaymentsByOrganization(user.token, user.organizationId); 
          setPayments(response.data);
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      }
    };

    fetchPayments();
  }, [user]);

  return (
    <div className="order-list">
      <h2>Order History</h2>
      <ul>
        {payments.map(payment => (
          <li key={payment._id}>
            <div>
              <p>Amount: INR {payment.amount}</p>
              <p>Status: {payment.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
