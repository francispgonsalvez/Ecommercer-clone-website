import React from 'react';
import { useForm } from 'react-hook-form';
import './AdminLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminInfo } from '../../../redux/slice/AdminSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const error = useSelector(state => state.admin.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
      const response = await dispatch(getAdminInfo({
        password: data.password,
        email: data.email,
      }));

      if (!response.error) {
        navigate('/admin');
      }else{
        Cookies.remove('adminToken');
       navigate('/admin/login');
      }
      

    } catch (error) {
      console.error("Error fetching Admin Info:", error);
    }
  };

  return (
    <div className='MainPage'>
      <div className='container'>
        <div className='loginFormSection'>
          <div className='loginFromContent'>
            <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='FormContent'>
                <div className='loginHeading'>
                  <h3>Admin Login Panel</h3>
                </div>
                <label htmlFor="email">
                  <h4>Email:</h4>
                </label>
                <input
                  type="email"
                  id="email"
                  className="inputBox"
                  placeholder="Enter email"
                  {...register("email", {
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Invalid email format",
                    },
                    required: "Email is required",
                  })}
                />
                <p className='error'>{errors.email?.message}</p>
                <label htmlFor="password">
                  <h4>password:</h4>
                </label>
                <input
                  type="text"
                  id="password"
                  className="inputBox"
                  placeholder="Enter Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    }
                  })}
                />
                <p className='error'>{errors.password?.message}</p>
                {error && <p className="error">{error}</p>}
                <div className='formSubmit'> <button type="submit" className="btn add">
                  Submit
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin;