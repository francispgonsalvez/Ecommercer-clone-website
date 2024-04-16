import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts, userLogout } from '../../../redux/slice/UserSlice';
import './userHeader.css';

const UserHeader = () => {
  const { Token } = useSelector((state) => state.user);
  const { totalQuantity } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = () => {
      navigate('/user');
  };

  const handleLogout = () => {
    dispatch(userLogout());
    Cookies.remove('userToken', Token);
    navigate('/user/login');
  };

  useEffect(() => {
    dispatch(getAllCarts(Cookies.get('userId')));
  }, [dispatch]);

  const handleOrdersDetails = () => {
    navigate('/user/orders')
  }

  const handleAddedCart = () => {
    navigate('/user/category/product/cart')
  }
  return (
    <div className='Header_Section'>
      <div className='Heading'>
        <div className='headerList'>
          <ul>
            <li>Home</li>
            <li onClick={() => handleItemClick()}>Categories</li>
            <li onClick={() => { handleOrdersDetails() }}>Orders</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className='searchBox'>
          <input type="text" placeholder='Search...' />
        </div>
        <div className='productCart' onClick={() => { handleAddedCart() }}>
          <span className="material-symbols-outlined"> shopping_bag </span>
          <span className='CartValue'>{totalQuantity}</span>
        </div>
        <div className='Logout'>
          <button className='logoutBtn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default UserHeader