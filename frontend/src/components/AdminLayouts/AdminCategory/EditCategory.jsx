import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import "./adminCategory.css";
import { useDispatch } from 'react-redux';
import { editCategory, getCategories, getCategoryById } from '../../../redux/slice/CategorySlice';

const EditCategory = ({ editModalClose, categoryId }) => {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const watchedImage = watch('images');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoryData = async () => {

      try {
        const actionResult = await dispatch(getCategoryById(categoryId));
        const CategoryData = actionResult.payload;
        if (CategoryData) {
          setValue("name", CategoryData.name || '');
          setValue("description", CategoryData.description || '');
          setImagePreview(`http://localhost:5001/${CategoryData.images}`);
        }
      } catch (error) {
        console.error("Error fetching Category data:", error);
      }
    };

    fetchCategoryData();
  }, [categoryId, dispatch,setValue ]);


  useEffect(() => {
    if (watchedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (watchedImage[0] instanceof File) {
        reader.readAsDataURL(watchedImage[0]);
      }
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("images", data.images[0]);
      formData.append("name", data.name);
      formData.append("description", data.description);
        await dispatch(editCategory({ id: categoryId, data: formData }));
        dispatch(getCategories());
        editModalClose();
    } catch (error) {
      console.error("Error updating Category:", error);
    }
  };


  return (
    <div>
      <div className="AddForm">
        <div className='closeFrom'><button className="close_btn" onClick={editModalClose}><i className="fa-solid fa-xmark"></i></button></div>
        <div className="FormSection">
          <div className="heading">
            <h2>Edit Category</h2>
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
                            const file = e.target.files[0];
                            onChange(file);
                          }}
                          {...register("images")}
                          hidden
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="imagePreview"
                            className="imagePreview"
                          />
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
                    // pattern: {
                    //   value: /^[A-Za-z]+$/,
                    //   message: "Invalid name format",
                    // },
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
export default EditCategory