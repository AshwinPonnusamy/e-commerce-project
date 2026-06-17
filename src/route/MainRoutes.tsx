import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import ProductsPage from '../pages/productList/ProductsPage';
import ProductDetailPage from '../pages/productDetail/ProductDetailPage';
import ShoppingCart from '../pages/cart/ShoppingCart';
import CheckOut from '../pages/checkout/CheckOut';
import PaymentStatus from '../pages/checkout/PaymentStatus';
import FAQ from '../pages/faq/FAQ';
import ProfileLayout from '../pages/profile/ProfileLayout';
import Orders from '../pages/profile/Orders';
import Addresses from '../pages/profile/Addresses';

// Admin Imports
import AdminLayoutWrapper from '../pages/admin/pages/AdminLayoutWrapper';
import StitchDashboard from '../pages/admin/pages/Dashboard';
import ProductList from '../pages/admin/pages/Products/ProductList';
import ProductForm from '../pages/admin/pages/Products/ProductForm';
import CategoryManager from '../pages/admin/pages/Categories/CategoryManager';
import StitchInventory from '../pages/admin/pages/Inventory';
import OrderManager from '../pages/admin/pages/Orders/OrderManager';
import CouponManager from '../pages/admin/pages/Coupons/CouponManager';
import CampaignManager from '../pages/admin/pages/Campaigns/CampaignManager';
import CustomerManager from '../pages/admin/pages/Customers/CustomerManager';
import ReportDashboard from '../pages/admin/pages/Reports/ReportDashboard';
import StoreSettings from '../pages/admin/pages/Settings/StoreSettings';

import AdminAccessGuard from '../pages/admin/pages/AdminAccessGuard';

const MainRoutes = () => {
  return (
    <Routes>
      {/* Root Redirect */}
      <Route path="/" element={<Navigate to="/layout/home" replace />} />

      {/* Main Layout Routes */}
      <Route path="/layout" element={<Layout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="allproducts" element={<ProductsPage />} />
        <Route path="productdetail/:id" element={<ProductDetailPage />} />
        <Route path="shoppingcart" element={<ShoppingCart />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="checkout/payment-status/:status" element={<PaymentStatus />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="settings" element={<Orders />} /> {/* Placeholder for now */}
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <AdminAccessGuard>
            <AdminLayoutWrapper />
          </AdminAccessGuard>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StitchDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="inventory" element={<StitchInventory />} />
        <Route path="orders" element={<OrderManager />} />
        <Route path="coupons" element={<CouponManager />} />
        <Route path="campaigns" element={<CampaignManager />} />
        <Route path="customers" element={<CustomerManager />} />
        <Route path="reports" element={<ReportDashboard />} />
        <Route path="settings" element={<StoreSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/layout/home" replace />} />
    </Routes>
  );
};

export default MainRoutes;
