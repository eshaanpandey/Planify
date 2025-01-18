import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.pricePerUser * item.quantity,
    0
  );

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h3 className="font-semibold">Total:</h3>
        <p className="text-xl font-bold">INR {totalAmount}</p>
      </div>
      {user && user.role === 'admin' ? (
        <Link
          to="/admin/checkout"
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md mx-auto block text-center"
        >
          Proceed to Checkout
        </Link>
      ) : (
        <p className="mt-4 text-red-500">Only admins can proceed to checkout.</p>
      )}
    </div>
  );
};

export default CartSummary;
