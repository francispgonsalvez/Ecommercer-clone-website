import React from 'react'
import "./delete.css"
import { useDispatch } from 'react-redux';
import { deleteCategory, getCategories } from '../../../redux/slice/CategorySlice';

const DeleteCategory = ({ deleteModalClose, categoryId }) => {
    const dispatch = useDispatch();

    const deleteBtn = async () => {
        try {
            await dispatch(deleteCategory(categoryId));
            dispatch(getCategories());
            deleteModalClose();
        } catch (error) {
            console.error("Error deleting Category:", error);
        }
    }
    return (
        <>
            <div className='DeleteForm'>
                <div className='closeFrom'><button className="close_btn" onClick={deleteModalClose}><i className="fa-solid fa-xmark"></i></button></div>
                <div className="deleteFormSection">
                    <div className="deleteHeading">
                        <h2>Delete Category</h2>
                    </div>
                    <p className='paragraph'>Are you sure you want to delete this Category?</p>
                    <div className='formSubmit'>
                        <button type="submit" className="btn delete" onClick={deleteBtn}> Delete </button>
                    </div>
                </div>
            </div>
            <div className='overlay'></div>
        </>
    )
}

export default DeleteCategory