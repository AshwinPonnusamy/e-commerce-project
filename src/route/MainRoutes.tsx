import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../authlogin/Login';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import ProductDetailPage from '../pages/productDetail/ProductDetailPage';
import ShoppingCart from '../pages/cart/ShoppingCart';
import ProductsPage from '../pages/productList/ProductsPage';
import FavoritesPage from '../pages/wishList/FavoritesPage';
import CommonStepper from '../pages/order/CheckOut';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/layout/home" />} />
      <Route path="layout" element={<Layout />}>
        <Route path='home' element={<Home />} />
        <Route path="productdetail" element={<ProductDetailPage />} />
        <Route path="shoppingcart" element={<ShoppingCart />} />
        <Route path="allproducts" element={<ProductsPage />} />
        <Route path="favoritepage" element={<FavoritesPage />} />
        <Route path="orderdetails" element={<CommonStepper />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
