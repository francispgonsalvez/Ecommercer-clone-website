import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getProducts,
  updateCategoryId,
} from "../../../redux/slice/ProductSlice";
import UserHeader from "../Commen/UserHeader";
import "./userCategoryList.css";
import Cookies from "js-cookie";
import { addToCart } from "../../../redux/slice/UserSlice";
const UserCategoryList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryId = location.state.categoryId;
  const userId = Cookies.get("userId");
  const { product, loading, error } = useSelector((state) => state.product);
  const [addedToCart, setAddedToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts({ categoryId }));
    dispatch(updateCategoryId(categoryId));
  }, [dispatch, categoryId]);

  const handleAddToCart = (productId) => {
    if (addedToCart) {
      dispatch(addToCart({ userId, productId, quantity: 1 }));
      setAddedToCart((prev) => ({ ...prev, [productId]: true }));
    }
  };
  const handleGoToCart = () => {
    navigate("/user/category/product/cart");
  };
  const handleProductDetails = (productId) => {
    navigate("/user/category/product-details", { state: { productId } });
  };

  return (
    <div className="PageSection">
      <div className="container">
        <div className="MainHeading">
          <UserHeader />
        </div>
        <div className="CategorySection">
          <div className="productDetails">
            {product?.map((product, index) => (
              <div className="productCard" key={product._id}>
                <div className="productCardImg">
                  <img
                    src={`http://localhost:5001/${product.images[0]}`}
                    alt={index}
                    onClick={() => handleProductDetails(product._id)}
                  />
                </div>
                <div className="cardContent">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="price">${product.price}</div>

                  <div className="productAction">
                    {!addedToCart[product._id] ? (
                      <button
                        className="productCartBtn"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="productCartBtn"
                        onClick={() => handleGoToCart()}
                      >
                        Go to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {product.length === 0 && (
              <p className="NoProduct">No Product found</p>
            )}
            {loading && <div className="loading"> Loading ... </div>}
            {error && <div className="error"> {error} </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCategoryList;
