import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../redux/slice/CategorySlice';
const UserCategory = () => {
    const dispatch = useDispatch();
    const { category, loading, error } = useSelector((state) => state.category);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch]);

    const handleCategoryImageClick = (categoryId) => {
        navigate('/user/category/product', { state: { categoryId } });
    };
    return (
        <div className='PageSection'>
            <div className='container'>
                <div className='categoryContent'>
                    <div className='CategorySection'>
                        <div className='productDetails'>
                            {category?.map((category) => (
                                <div className='productCard' key={category._id}>
                                    <div className='productCardImg'>
                                        <img src={`http://localhost:5001/${category.images}`} alt="" onClick={() => handleCategoryImageClick(category._id)} />
                                    </div>
                                    <div className='cardContent'>
                                        <h3>{category.name}</h3>
                                        <p>{category.description}</p>
                                    </div>
                                </div>
                            ))}
                            {
                                loading && <div className="loading"> Loading ... </div>
                            }
                            {
                                error && <div className="error"> {error} </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCategory