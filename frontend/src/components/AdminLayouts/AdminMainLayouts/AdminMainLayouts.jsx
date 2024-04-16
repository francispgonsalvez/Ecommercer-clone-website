import React, { useState } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import AdminSideBar from '../AdminSideBar/AdminSideBar'
import "./adminMainLayout.css";
import AdminCategory from '../AdminCategory/AdminCategory'
import AdminProduct from '../AdminProduct/AdminProduct'
import AdminOrder from '../AdminOrder/AdminOrder'
const AdminMainLayouts = () => {
    const [selectedOption, setSelectedOption] = useState('categories');

    const handleSidebarClick = (option) => {
        setSelectedOption(option);
    };
    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='Main_Heading'>
                    <AdminHeader />
                </div>
            </div>
            <div className='PageSection'>
                <div className='container'>
                    <div className="pageContent">
                        <div className='adminSideBar'>
                            <AdminSideBar onSidebarClick={handleSidebarClick} />
                        </div>
                        <div className='tableBody'>
                            {selectedOption === 'categories' && <AdminCategory />}
                            {selectedOption === 'products' && <AdminProduct />}
                            {selectedOption === 'orders' && <AdminOrder />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMainLayouts