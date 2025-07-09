import React, { useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../services/paymentService';
import { setPaymentIntent, setPaymentLoading, setPaymentError } from '../../redux/slices/paymentSlices';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { clientSecret, loading, error } = useSelector((state) => state.payment);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { organizationId } = useSelector((state) => state.auth);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.pricePerUser * item.quantity,
    0
  );

  const planId = "678a0496ec21cae4822728a7";
  const usersPurchased = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        dispatch(setPaymentLoading(true));
        const token = getAuthToken().replace(/['"]+/g, '');
        const secret = await createPaymentIntent(totalAmount, token, planId, organizationId, usersPurchased);
        console.log("created payment intent");
        dispatch(setPaymentIntent(secret));
      } catch (err) {
        dispatch(setPaymentError('Failed to create payment intent.'));
      } finally {
        dispatch(setPaymentLoading(false));
      }
    };

    fetchPaymentIntent();
  }, [totalAmount, planId, organizationId, usersPurchased, dispatch]);

  const handlePayment = async () => {
    if (!clientSecret || !stripe || !elements) {
      alert('Payment not initialized');
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      alert('Payment failed. Please try again.');
    } else {
      alert('Payment successful!');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <CardElement />
      <button onClick={handlePayment} disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Checkout;
