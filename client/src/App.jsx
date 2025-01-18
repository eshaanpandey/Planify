import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './pages/LandingPage';
import Login from './components/Auth/Login';
import RegisterAdmin from './components/Auth/RegisterAdmin';
import RegisterSuperAdmin from './components/Auth/RegisterSuperAdmin';

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';

import RoleRoute from './routes/RoleRoutes';

import UserDashboard from './pages/Dashboards/UserDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import SuperAdminDashboard from './pages/Dashboards/SuperAdminDashboard';

import OrganizationDetails from './components/SuperAdmin/Organizations';
import PlanList from './components/Plans/PlanList';
import Cart from './components/Cart/Cart';

import Checkout from './components/Payments/Checkout';
import OrderHistory from './components/Orders/OrderHistory';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/admin/register" element={<RegisterAdmin />} />
      <Route path="/superadmin/register" element={<RegisterSuperAdmin />} />

      <Route
        path="/admin/*"
        element={
          <RoleRoute role="admin">
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="plans" element={<PlanList />} />
                <Route path="orders" element={<OrderHistory />} />
              </Routes>
            </AdminLayout>
          </RoleRoute>
        }
      />
      <Route path="/admin/cart" element={<AdminLayout><Cart /></AdminLayout>} />
      <Route
        path="/admin/checkout"
        element={
          <AdminLayout>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </AdminLayout>
        }
      />


      <Route
        path="/superadmin/*"
        element={
          <RoleRoute role="superadmin">
            <SuperAdminLayout>
              <Routes>
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="plans" element={<PlanList />} />
                <Route path="organizations" element={<OrganizationDetails />} />
              </Routes>
            </SuperAdminLayout>
          </RoleRoute>
        }
      />
      <Route
        path="/user/*"
        element={
          <RoleRoute role="user">
            <UserLayout>
              <Routes>
                <Route path="dashboard" element={<UserDashboard />} />
              </Routes>
            </UserLayout>
          </RoleRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>


  );
}

export default App;
