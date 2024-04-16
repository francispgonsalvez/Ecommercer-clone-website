import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProductById, getProducts } from '../../../redux/slice/ProductSlice';

const EditProduct = ({ editModalClose, productId }) => {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const watchedImages = watch('images');
  const { category } = useSelector((state) => state.category);
  const { categoryId } = useSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryData = async () => {

      try {
        const actionResult = await dispatch(getProductById(productId));
        const productData = actionResult.payload;
        if (productData) {
          setValue("name", productData.name || '');
          setValue("description", productData.description || '');
          setValue("price", productData.price || '');
          setSelectedCategory(productData.category);
          const previews = productData.images.map(image => `http://localhost:5001/${image}`);
          setImagePreviews(previews);
        }
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };

    fetchCategoryData();
  }, [productId, dispatch, setValue]);


  useEffect(() => {
    if (watchedImages && watchedImages.length > 0) {
      const previews = [];

      const loadImagePreviews = async () => {
        for (const image of watchedImages) {
          const reader = new FileReader();

          reader.onloadend = () => {
            previews.push(reader.result);

            if (previews.length === watchedImages.length) {
              setImagePreviews(previews);
            }
          };
          if (image instanceof File) {
            reader.readAsDataURL(image);
          }
        }
      };

      loadImagePreviews();
    } else {
      setImagePreviews([]);
    }
  }, [watchedImages]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const file of data.images) {
        formData.append("images", file);
      }
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", selectedCategory);
      await dispatch(editProduct({ id: productId, data: formData }));
      dispatch(getProducts({ categoryId }));
      editModalClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <div className="AddForm">
        <div className='closeFrom'><button className="close_btn" onClick={editModalClose}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="FormSection">
          <div className="heading">
            <h2>Edit Product</h2>
          </div>
          <div className="formContiner">
            <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="FormContent">
                <Controller
                  name="images"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <div className='imageInput'>
                      <div className='avatar'>
                        <label htmlFor="images">
                          <h4>Image</h4>
                        </label>
                        <input
                          type="file"
                          id="images"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            onChange(files);
                            setValue("images", files);
                          }}
                          {...register("images", {
                          })}
                          multiple
                          hidden
                        />
                        {imagePreviews.length > 0 ? (
                          imagePreviews.map((preview, index) => (
                            <img
                              key={index}
                              src={preview}
                              alt={`update ${index + 1}`}
                              className="imagePreview"
                            />
                          ))
                        ) : (
                          <div className='defaultImage'></div>
                        )}
                        <label htmlFor="images" className='addImage'>Change</label>
                        <p className="error">{errors.images?.message}</p>
                      </div>
                    </div>
                  )}
                />
                <label htmlFor="name">
                  <h4>Name:</h4>
                </label>
                <input
                  type="text"
                  id="name"
                  className="inputBox"
                  placeholder="Enter Name"
                  {...register("name", {
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Invalid name format",
                    },
                    required: "name is required",
                  })}
                />
                <p className='error'>{errors.name?.message}</p>
                <label htmlFor="description">
                  <h4>Description:</h4>
                </label>
                <input
                  type="text"
                  id="description"
                  className="inputBox"
                  placeholder="Enter Description"
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                <p className='error'>{errors.description?.message}</p>
                <label htmlFor="price">
                  <h4>Price:</h4>
                </label>
                <input
                  type="text"
                  id="price"
                  className="inputBox"
                  placeholder="Enter price"
                  {...register("price", {
                    required: "description is required",
                  })}
                />
                <p className='error'>{errors.price?.message}</p>

                <h4>Category:</h4>

                <select name="category" id="category" value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                   >
                  <option value="">select category</option>
                  {category?.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
                <p className='error'>{errors.category?.message}</p>
              </div>
              <div className='formSubmit'>
                <button className='close_btn close' onClick={editModalClose}>Cancel</button>
                <button type="submit" className="btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='overlay'></div>
    </div>

  )
}

export default EditProduct