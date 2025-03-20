import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../authlogin/Login';
import Layout from '../layout/Layout';
import Home from '../pages/Home';
import IntrestPage from '../pages/IntrestPage';
import CreateProduct from '../pages/CreateEvent';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/layout/home" />} />
      <Route path="layout" element={<Layout />}>
        <Route path='home' element={<Home />} />
        <Route path="intrest" element={<IntrestPage />} />
        <Route path="createevent" element={<CreateProduct />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
