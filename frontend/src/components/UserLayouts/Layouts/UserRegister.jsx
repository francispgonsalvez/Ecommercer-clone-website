import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../../redux/slice/UserSlice';
const UserRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const error = useSelector(state => state.user.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(userRegister({
                username: data.username,
                email: data.email,
                password: data.password,
                phone: data.phone,
            }));

            if (!response.error) {
                navigate('/user/login');
            } else {
                navigate('/user/register');
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
                                    <h3> SignUp</h3>
                                </div>
                                <label htmlFor="username">
                                    <h4>Username:</h4>
                                </label>
                                <input
                                    type="username"
                                    id="username"
                                    className="inputBox"
                                    placeholder="Enter username"
                                    {...register("username", {
                                        pattern: {
                                            value: /^[A-Za-z]+$/,
                                            message: "Invalid username format",
                                        },
                                        required: "username is required",
                                    })}
                                />
                                <p className='error'>{errors.username?.message}</p>
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
                                <label htmlFor="phone">
                                    <h4>Phone:</h4>
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="inputBox"
                                    placeholder="Enter phone"
                                    {...register("phone", {
                                        pattern: {
                                              value: /^\d{10}$/,
                                            message: "Invalid phone format",
                                        },
                                        required: "phone is required",
                                    })}
                                />
                                <p className='error'>{errors.phone?.message}</p>
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
                                <p>Already have an account? <a href='/user/login'>Login</a> here</p>
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

export default UserRegister