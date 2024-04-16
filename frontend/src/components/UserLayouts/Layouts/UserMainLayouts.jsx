import React from 'react'
import './userMainLayouts.css'
import UserCategory from './UserCategory';
import UserHeader from '../Commen/UserHeader';
const UserMainLayouts = () => {
    return (
        <div className='MainPage'>
            <div className='container'>
                <div className='MainHeading'>
                    <UserHeader />
                </div>
                <div>
                    <UserCategory />
                </div>
            </div>
        </div>
    )
}

export default UserMainLayouts