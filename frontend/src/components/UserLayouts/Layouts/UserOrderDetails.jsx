import React, { useEffect } from "react";
import "./UserOrderDetails.css";
import UserHeader from "../Commen/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../../../redux/slice/UserSlice";
import Cookies from "js-cookie";

const UserOrdersDetails = () => {
  const userId = Cookies.get("userId");
  const { UserOrders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrder(userId));
  }, [dispatch, userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="MainPage">
      <div className="container">
        <div className="MainHeading">
          <UserHeader />
        </div>
        <div className="userOrders">
          <div className="userOrderHeading">
            <h2>Orders</h2>
          </div>
          <div className="userOrdersBox">
            {UserOrders &&
              UserOrders?.map((order) => (
                <div className="userOrderSection" key={order._id}>
                  <div className="userOrderCard">
                    <div className="userOrderHead">
                      <h3>Order ID: {order._id}</h3>
                      <span>Order date: {formatDate(order.orderDate)}</span>
                      <span>Order Status: {order.orderStatus}</span>
                    </div>
                    <div className="userOrderContent">
                      <div className="userOrderTable">
                        <table>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products?.map((order) => (
                              <tr key={order._id}>
                                <td>
                                  <div className="userOrderImg">
                                    <img
                                      className="userOrderProductImg"
                                      src={`http://localhost:5001/${order.product[0]?.images[0]}`}
                                      alt=""
                                    />
                                    <h4>{order.product[0].name}</h4>
                                  </div>
                                </td>
                                <td>
                                  <span>${order.product[0].price}</span>
                                </td>
                                <td>
                                  <span>Qty: {order.quantity}</span>
                                </td>
                                <td>
                                  <div className="total">
                                    {`Subtotal(${order.quantity} items): $${
                                      order.quantity * order.product[0].price
                                    }`}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="orderedProductTotal">
                        <span> Subtotal: ${order.totalAmount}</span>
                      </div>
                      <div className="userOrderInfo">
                        <div className="usershippingAddress">
                          <h4>Shipping</h4>
                          <span>Address</span>
                          <span>
                            {order.shippingAddress?.city}{" "}
                            {order.shippingAddress?.line1}{" "}
                          </span>
                          <span>
                            {" "}
                            {order.shippingAddress?.line2}{" "}
                            {order.shippingAddress?.state}{" "}
                          </span>
                          <span>
                            {order.shippingAddress?.country}{" "}
                            {order.shippingAddress?.postal_code}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersDetails;
