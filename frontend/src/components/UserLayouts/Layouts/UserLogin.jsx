import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLogin } from '../../../redux/slice/UserSlice';

const UserLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const error = useSelector(state => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(userLogin({
          email: data.email,
         password: data.password,
      }));

      if (!response.error) {
        navigate('/user');
      }else{
        Cookies.remove('userToken');
       navigate('/user/login');
      }
      
    } catch (error) {
      console.error("Error fetching User Info:", error);
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
                  <h3>Login</h3>
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
                { error && <p className="error">{error}</p>}
                <p>Don’t have an account? <a href='/user/register'> Sign Up</a> here</p>
                <div className='formSubmit'> <button type="submit" className="btn add">
                  Submit
                </button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default UserLogin