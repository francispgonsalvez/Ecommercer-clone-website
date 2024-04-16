import React from 'react'
import "./adminSideBar.css"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slice/AdminSlice';
import { updateCategoryId } from '../../../redux/slice/ProductSlice';

const AdminSideBar = ({ onSidebarClick }) => {
  const { token } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (option) => {
     onSidebarClick(option);
    if (option === 'categories') {
      navigate('/admin');
    } else if (option === 'products') {
      navigate('/admin');
      dispatch(updateCategoryId(""))
    }
    else if(option === 'orders') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove('adminToken',token);
    navigate('/admin/login');
  };

  return (
    <div className='sideBarSection'>
      <ul>
        <li onClick={() => handleItemClick('categories')}>Categories</li>
        <li onClick={() => handleItemClick('products')}>Products</li>
        <li onClick={() => handleItemClick('orders')}>Orders</li>
        <button className='LogoutBtn' onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  )
}

export default AdminSideBar