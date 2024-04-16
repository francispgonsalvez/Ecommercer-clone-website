import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createCategory, getCategories } from '../../../redux/slice/CategorySlice';
import "./add.css";


const AddCategory = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues, control, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const watchedImage = watch('images');
  const dispatch = useDispatch();

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
    const formData = new FormData();
    formData.append("images", data.images[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);

    dispatch(createCategory(formData))
      .then(() => {
        dispatch(getCategories());
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating Category:", error);
      });
  };

  return (
    <>
      <div className="AddForm">
        <div className='closeFrom'>
          <button className="close_btn" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="FormSection">
          <div className="heading">
            <h2>Add Category</h2>
          </div>
          <div className="formContiner">
            <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="FormContent">
                <Controller
                  name="images"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <div className='imageInput'>
                      <div className={`avatar ${!getValues('images') ? 'empty' : ''}`}>
                        <label htmlFor="images">
                          <h4>Image</h4>
                        </label>
                        <input
                          type="file"
                          id="images"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            onChange(file);
                            setValue("images", file);
                          }}
                          {...register("images", {
                            required: "Image is required",
                          })}
                          hidden
                        />
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="New Category"
                            className="imagePreview"
                          />
                        ) : (
                          <div className='defaultImage'></div>
                        )}
                        <label htmlFor="images" className='addImage'>Add</label>
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
                <button className='close_btn close' onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn add"> Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='overlay'></div>
    </>
  )
}

export default AddCategory