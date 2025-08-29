import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import AdminDemo from './pages/AdminDemo';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';

// Import auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import admin components
import AdminLayout from './components/admin/Layout/AdminLayout';
import AdminHome from './pages/admin/Home';
import UserManagement from './pages/admin/UserManagement';
import SystemConfig from './pages/admin/SystemConfig';
import ReportsAndMonitoring from './pages/admin/ReportsAndMonitoring';
import DisputeManagement from './pages/admin/DisputeManagement';
import Cart from './pages/Cart';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin-demo" element={<AdminDemo />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="config" element={<SystemConfig />} />
          <Route path="reports" element={<ReportsAndMonitoring />} />
          <Route path="disputes" element={<DisputeManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;