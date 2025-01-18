import React, { useState } from 'react';

const CartItem = ({ plan, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(plan.quantity);

  const handleIncrement = () => {
    if (quantity < plan.maxUsers) {
      setQuantity(quantity + 1);
      onQuantityChange(plan._id, quantity + 1);
    } else {
      alert(`This plan allows a maximum of ${plan.maxUsers} users.`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onQuantityChange(plan._id, quantity - 1);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold">{plan.name}</h3>
        <p>Price: INR {plan.pricePerUser} per user</p>
        <p>Max Users: {plan.maxUsers}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="bg-gray-300 p-2 rounded-full"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          max={plan.maxUsers}
          onChange={(e) => onQuantityChange(plan._id, parseInt(e.target.value))}
          className="w-12 text-center mx-2 border p-2 rounded-md"
        />
        <button
          onClick={handleIncrement}
          className="bg-gray-300 p-2 rounded-full"
        >
          +
        </button>
        <button
          onClick={onRemove}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
