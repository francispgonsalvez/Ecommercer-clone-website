import React from 'react'
import './checkoutSuccess.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const cartItems = searchParams.get('cartItems');
    const parsedData = JSON.parse(decodeURIComponent(cartItems));
  
    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='checkoutSuccess'>
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="tick-container">
                                <div className="tick-icon">
                                    <span className="material-symbols-outlined">
                                        done
                                    </span>
                                </div>
                            </div>
                            <h2>Payment Successful!</h2>
                            <p>Thank you for your purchase.</p>
                            <button onClick={() =>navigate('/user/category/product/order-details' ,{state:{cartItems:parsedData,id:id}})}>go to order Details <i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CheckoutSuccess