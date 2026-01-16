import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../authlogin/Login';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import ProductDetailPage from '../pages/productDetail/ProductDetailPage';
import ShoppingCart from '../pages/cart/ShoppingCart';
import ProductsPage from '../pages/productList/ProductsPage';
import FavoritesPage from '../pages/wishList/FavoritesPage';
import CommonStepper from '../pages/checkout/CheckOut';
import PaymentStatus from '../pages/checkout/PaymentStatus';
import Register from '../authlogin/Register';
import AddProduct from '../pages/productList/add_product/AddProduct';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { ProtectedRoute, AdminRoute } from '../components/auth/ProtectedRoute';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/layout/home" />} />
      <Route path="layout" element={<Layout />}>
        <Route path='home' element={<Home />} />
        <Route path="productdetail" element={<ProductDetailPage />} />
        <Route path="allproducts" element={<ProductsPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="shoppingcart" element={<ShoppingCart />} />
          <Route path="favoritepage" element={<FavoritesPage />} />
          <Route path="orderDetails" element={<CommonStepper />} />
          <Route path="orderDetails/payment-status/:status" element={<PaymentStatus />} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<AdminRoute />}>
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
