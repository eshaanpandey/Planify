import React from 'react';

const OrderDetailsModal = ({ order, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-xl font-semibold">{order.name}</h3>
        <p>Status: {order.status}</p>
        <p>Details: {order.details}</p>
        <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
