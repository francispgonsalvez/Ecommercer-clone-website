import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getProducts } from '../../../redux/slice/ProductSlice';
import { getCategories } from '../../../redux/slice/CategorySlice';

const AddProduct = ({ closeModal }) => {
    const { register, handleSubmit, formState: { errors }, setValue, control, watch } = useForm();
    const [imagePreview, setImagePreviews] = useState([]);
    const watchedImages = watch('images');
    const { category } = useSelector((state) => state.category);
    const [selectedCategory, setSelectedCategory] = useState("");
    const dispatch = useDispatch();
    const {categoryId } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    useEffect(() => {
        if (watchedImages) {
            const previews = [];
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
        } else {
            setImagePreviews([]);
        }
    }, [watchedImages]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const file of data.images) {
            formData.append('images', file);
        }
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", selectedCategory);
        dispatch(createProduct(formData))
            .then(() => {
                dispatch(getProducts({categoryId}));
                closeModal();
            })
            .catch((error) => {
                console.error("Error creating Category:", error);
            });
    };
    return (
        <div>
            <div className="AddForm">
                <div className='closeFrom'><button className="close_btn" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button></div>
                <div className="FormSection">
                    <div className="heading">
                        <h2>Add Product</h2>
                    </div>
                    <div className="formContiner">
                        <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="FormContent">
                                <Controller
                                    name="images"
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                        <div className='imageInput'>
                                            <div className={`avatar ${!watchedImages || watchedImages.length === 0 ? 'empty' : ''}`}>
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
                                                        required: "image is required",
                                                        validate: (value) => {
                                                            if (value.length > 5) {
                                                                return "Maximum 5 images allowed";
                                                            }
                                                            return true;
                                                        },
                                                    })}
                                                    multiple
                                                    accept="image/*"
                                                    hidden
                                                />
                                                {imagePreview.length > 0 ? (
                                                    imagePreview.map((preview, index) => (
                                                        <img
                                                            key={index}
                                                            src={preview}
                                                            alt={`New Contact ${index + 1}`}
                                                            className="imagePreview"
                                                        />
                                                    ))
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
                                        required: "price is required",
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
                                <button className='close_btn close' onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn add"> Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </div>
    )
}


export default AddProduct