import { configureStore } from '@reduxjs/toolkit';
import authSlices from './slices/authSlices';
import planSlices from './slices/planSlices';
import organizationSlices from './slices/organizationSlices';
import cartSlices from './slices/cartSlices';
import paymentSlice from './slices/paymentSlices';
// import userSlices from './slices/userSlices';

const store = configureStore({
  reducer: {
    auth: authSlices,
    plans: planSlices,
    organization: organizationSlices,
    cart: cartSlices,
    payment: paymentSlice,
  },
});

export default store;