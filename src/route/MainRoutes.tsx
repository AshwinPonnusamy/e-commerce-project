import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../authlogin/Login';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import IntrestPage from '../pages/IntrestPage';
import ProductDetailPage from '../pages/productDetail/ProductDetailPage';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/layout/home" />} />
      <Route path="layout" element={<Layout />}>
        <Route path='home' element={<Home />} />
        <Route path="intrest" element={<IntrestPage />} />
        <Route path="productdetail" element={<ProductDetailPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
