import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignIn,UserData } from '../services/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Dashboard from './Client/Dashboard';
import Logo from '../assets/img/logo.png';

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true');
    const navigate = useNavigate();
    const [signin, setSignin] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setSignin({ ...signin, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await SignIn(signin.username, signin.password);
        if (res.data === "Login Successful !") {
            const userData = await UserData(signin.username);
            const userId = userData.data.id;
            Cookies.set('Usernamex', signin.username);
            Cookies.set('Useridx', userId);
            Cookies.set('isLoggedIn', 'true');
            toast.success('Login Successful !', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                navigate('/dashboard/games');
            }, 1500);

        } else if (res.data === "Invalid Password") {
            toast.error('Invalid password!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Invalid Username!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    return (
        <>
            {isLoggedIn ?
                <Dashboard />
                :
                <div className='mainxz'>
                    <div className=''>

                        <div className="login-container">
                            <div className="login-form">
                                <div className="login-form-inner">
                                    <div className="logo"><svg height={512} viewBox="0 0 192 192" width={512} xmlns="http://www.w3.org/2000/svg">
                                        <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
                                    </svg></div>
                                    <h1 className="logtext">Login</h1>

                                    <div className="sign-in-seperator">
                                        <span>Sign in with Username</span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="login-form-group">
                                            <input type="text" placeholder="Username" id="username" value={signin.username} onChange={handleChange} required />
                                        </div>
                                        <div className="login-form-group">
                                            <input autoComplete="off" type="password" placeholder="Password" id="password" value={signin.password} onChange={handleChange} required />
                                        </div>
                                        <input type="submit" className="rounded-button login-cta d-form-btn" placeholder='Login' value='Login' />
                                    </form>
                                    <div className="register-div">Not registered yet? <Link to="/register" className="link create-account" >Create an account ?</Link></div>
                                </div>
                            </div>
                            <div className="onboarding">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide color-1">
                                            <div className="slide-image">
                                                <img src={Logo} loading="lazy" alt="img" />
                                            </div>
                                            <div className="slide-content">
                                                <h2>Turn your skills into reality.</h2>
                                                <Link to="/Admin/Login" className="link create-account" >Admin ?</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-pagination" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            }
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </>
    )
}
