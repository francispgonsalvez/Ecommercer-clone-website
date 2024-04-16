import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckoutSession,
  deleteCart,
  getAllCarts,
  updateQuantity,
} from "../../../redux/slice/UserSlice";
import Cookies from "js-cookie";
import UserHeader from "../Commen/UserHeader";
import "./userCart.css";

const UserCart = () => {
  const userId = Cookies.get("userId");
  const { userCarts, error, totalQuantity } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getAllCarts(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userCarts && userCarts?.[0]) {
      let totalPrice = 0;
      userCarts.forEach((cart) => {
        cart.items.forEach((item) => {
          if (item.productDetails && item.productDetails.price) {
            totalPrice += item.productDetails.price * item.quantity;
          }
        });
      });
      setTotalPrice(totalPrice);
    }
  }, [userCarts]);

  const handleCartRemove = async (productId) => {
    await dispatch(deleteCart({ userId, productId }));
    dispatch(getAllCarts(userId));
  };

  const handleQuantityUpdate = async (productId, action) => {
    console.log(userCarts);
    await dispatch(updateQuantity({ userId, productId, action }));
    dispatch(getAllCarts(userId));
  };

  const handleCheckout = (cartItems) => {
    console.log(cartItems);
    dispatch(
      createCheckoutSession({ cartItems: userCarts, userId, totalPrice })
    );
  };

  return (
    <div className="MainPage">
      <div className="PageSection">
        <div className="container">
          <div className="MainHeading">
            <UserHeader />
          </div>
          <div className="cartSection">
            <div className="cartPage">
              <h2>Shopping Cart</h2>
              <div className="page_content_section_table">
                <table>
                  <thead>
                    <tr>
                      <th className="tableHead">Item</th>
                      <th className="tableHead">Quantity</th>
                      <th className="tableHead">Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(userCarts) &&
                      userCarts?.map((cart) =>
                        cart.items.map((item, index) => (
                          <tr key={`${cart._id}_${index}`}>
                            <td className="cartCard">
                              <img
                                className="cartImage"
                                src={`http://localhost:5001/${item.productDetails.images[0]}`}
                                alt="Product"
                              />
                              <div className="cartItems">
                                <div className="cartHeading">
                                  <h3>{item.productDetails.name}</h3>
                                </div>
                              </div>
                            </td>
                            <td className="tableTd">
                              <div className="tableTd">
                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.productDetails._id,
                                      "decrement"
                                    )
                                  }
                                >
                                  -
                                </button>
                                {item.quantity}
                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.productDetails._id,
                                      "increment"
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="tableTd">
                              {item.productDetails && item.productDetails.price
                                ? item.productDetails.price
                                : "-"}
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleCartRemove(item.productDetails._id)
                                }
                              >
                                remove
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
                {totalQuantity === 0 && (
                  <span className="message">Your Cart is empty</span>
                )}

                {error && <div className="error"> {error} </div>}
              </div>
            </div>
            {totalQuantity ? (
              <div className="productCheckoutSection">
                <div className="totalPrice">
                  {`Subtotal (${totalQuantity} items): ${totalPrice}`}
                  <button
                    className="productCheckout"
                    onClick={() => handleCheckout({ userCarts })}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
