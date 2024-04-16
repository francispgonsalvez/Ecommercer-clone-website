import React, { useEffect } from 'react'
import './adminOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../../redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';
const AdminOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders } = useSelector((state) => state.admin);
    

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US');
    };

    const handleOrderClick = (orderId) => {
        navigate('/admin/user-order', {state: { orderId } })
    }

    return (
        <div className='produtcPage'>
            <div className='productHeading'>
                <h2>Products</h2>
            </div>
            <div className='ProductSection'>
                <div className='CardHeader'>
                    <input type="text" placeholder='Search...' />
                </div>
                <div className='AdminOrderDetails'>
                    <table>
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders?.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order.customerEmail}</td>
                                    <td>{`$${order.totalAmount}`}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td ><span className='AdminOrderStatus'>{order.orderStatus}</span></td>
                                    <td className='AdminOrderTable' onClick={() => handleOrderClick(order._id)}>
                                    <i class="fa-solid fa-eye"></i>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminOrder