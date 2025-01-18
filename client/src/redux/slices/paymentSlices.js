import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecret: null,
    loading: false,
    error: null,
    payments: [],
  },
  reducers: {
    setPaymentIntent: (state, action) => {
      state.clientSecret = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPaymentError: (state, action) => {
      state.error = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
    },
  },
});

export const { setPaymentIntent, setPaymentLoading, setPaymentError, setPayments } = paymentSlice.actions;

export default paymentSlice.reducer;
