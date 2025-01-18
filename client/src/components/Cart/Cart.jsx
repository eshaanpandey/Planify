import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlices';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ _id: id, quantity }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <CartItem
                  key={item._id}
                  plan={item}
                  onRemove={() => dispatch(removeFromCart(item))}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </div>
          )}
        </div>
        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;
