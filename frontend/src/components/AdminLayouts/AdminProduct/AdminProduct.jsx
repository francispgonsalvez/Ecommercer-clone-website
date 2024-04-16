import React, { useEffect, useState } from 'react'
import "./adminProduct.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, updateCategoryId } from '../../../redux/slice/ProductSlice';
import AddProduct from './AddProduct'
import DeleteProduct from './DeleteProduct'
import EditProduct from './EditProduct'
import { getCategories } from '../../../redux/slice/CategorySlice';

const AdminProduct = () => {
  const { product, loading, error, categoryId } = useSelector((state) => state.product);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { category } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ categoryId }));
  }, [dispatch, categoryId]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    dispatch(updateCategoryId(categoryId));
  };


  return (
    <div className='produtcPage'>
      <div className='productHeading'>
        <h2>Products</h2>
        <button className='addBtn product' onClick={() => setAddModal(true)}>Create new</button>
      </div>
      <div className='ProductSection'>
        <div className='CardHeader'>
          <input type="text" placeholder='Search...' />
          <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}  >
            <option value=''>All category</option>
            {category && category.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            )) }
          </select>
        </div>
        <div className='productDetails'>
          {!loading && Array.isArray(product) && product.length === 0 && selectedCategory && (
            <div className="noData">No products available for the selected category</div>
          )}
          {Array.isArray(product) && product?.map((products, index) => (
            <div className='productCard' key={products._id}>
              <div className='productCardImg'>
                <img src={`http://localhost:5001/${products.images[0]}`} alt="" />
              </div>
              <div className='cardContent'>
                <h3>{products.name}</h3>
                {/* <p>{products.description}</p> */}
                <div className='price'>${products.price}</div>
                <div className='productAction'>
                  <button className='productBtn edit' onClick={() => setEditModal(products._id)} >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button className='productBtn delete' onClick={() => setDeleteModal(products._id)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {
          addModal && <AddProduct closeModal={() => setAddModal(false)} />
        }
        {
          editModal && <EditProduct editModalClose={() => setEditModal(false)} productId={editModal} />
        }
        {
          deleteModal && <DeleteProduct deleteModalClose={() => { setDeleteModal(false) }} productId={deleteModal} />
        }
        {
          loading && <div className="loading"> Loading ... </div>
        }
        {
          error && <div className="error"> {error} </div>
        }
      </div>
    </div>
  )
}

export default AdminProduct