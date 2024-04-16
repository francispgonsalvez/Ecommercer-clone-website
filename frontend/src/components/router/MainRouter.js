import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminMainLayouts from '../AdminLayouts/AdminMainLayouts/AdminMainLayouts';
import AdminLogin from '../AdminLayouts/AdminLogin/AdminLogin';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import CategoryProductList from '../AdminLayouts/AdminCategory/CategoryProduct';
import UserRegister from '../UserLayouts/Layouts/UserRegister';
import UserLogin from '../UserLayouts/Layouts/UserLogin';
import UserMainLayouts from '../UserLayouts/Layouts/UserMainLayouts';
import UserCategoryList from '../UserLayouts/Layouts/UserCategoryList';
import UserCart from '../UserLayouts/Layouts/UserCart';
import CheckoutSuccess from '../UserLayouts/Layouts/CheckoutSuccess';
import OrderDetails from '../UserLayouts/Layouts/OrderDetails';
import UserOrder from '../AdminLayouts/AdminOrder/UserOrder';
import UserOrdersDetails from '../UserLayouts/Layouts/UserOrderDetails';
import ProductDetails from '../UserLayouts/Layouts/ProductDetails';
const MainRouter = () => {
  const { token } = useSelector((state) => state.admin);
  const { Token } = useSelector((state) => state.user);

  const isLoggedIn = () => {

    const adminToken = Cookies.get('adminToken');
    if (!adminToken && !token) {
      return false;
    }
    return true;
  };
  const isLoggedInUser = () => {
    const userToken = Cookies.get('userToken');
    if (!userToken && !Token) {
      return false;
    }
    return true;
  };


  return (
    <>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={isLoggedIn() ? <AdminMainLayouts /> : <Navigate to="/admin/login" />} />
        <Route path='/admin/category/product' element={<CategoryProductList />} />
        <Route path='/admin/user-order' element={<UserOrder />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user' element={isLoggedInUser() ? <UserMainLayouts /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product' element={isLoggedInUser() ? <UserCategoryList /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product/cart' element={isLoggedInUser() ? <UserCart /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product-details' element={<ProductDetails/>} />
        <Route path='/user/orders' element={isLoggedInUser() ? <UserOrdersDetails /> : <Navigate to='/user/login' />} />
        <Route path='/user/category/product/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/user/category/product/order-details' element={<OrderDetails />} />
      </Routes>
    </>
  );
};

export default MainRouter;
