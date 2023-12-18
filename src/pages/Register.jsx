import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SignUp } from '../services/api'
import Logo from '../assets/img/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [signup, setSignup] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    isactive:true

  })
  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 5000);
    const res = await SignUp(signup.username, signup.password, signup.email, signup.phone, signup.age, signup.isactive);
    if (res.data === "Signup Successful !") {
      toast.success('Signup Successful !', {
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
        navigate('/Login');
      }, 1500);
    } else if (res.data === "Username Already Exists") {
      toast.error('Username Already Exists !', {
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
      console.log(res.data);
    }
  }

  return (
    <>
      <div className='main'>
        <div className='d-reg-wrap max-d-filter'>
          <div className="login-container h-x-40">
            <div className="login-form">
              <div className="login-form-inner">
                <div className="logo"><svg height={512} viewBox="0 0 192 192" width={512} xmlns="http://www.w3.org/2000/svg">
                  <path d="m155.109 74.028a4 4 0 0 0 -3.48-2.028h-52.4l8.785-67.123a4.023 4.023 0 0 0 -7.373-2.614l-63.724 111.642a4 4 0 0 0 3.407 6.095h51.617l-6.962 67.224a4.024 4.024 0 0 0 7.411 2.461l62.671-111.63a4 4 0 0 0 .048-4.027z" />
                </svg></div>
                <h1 className="logtext">Register</h1>
                <form onSubmit={handleSubmit}>
                  <div className="login-form-group textInputWrapper">
                    <input type="text" placeholder="Username" id="username" value={signup.username} onChange={handleChange} required className='textInput' />
                  </div>
                  <div className="login-form-group textInputWrapper">
                    <input type="email" placeholder="Email" id="email" value={signup.email} onChange={handleChange} required className='textInput' />
                  </div>
                  <div className="login-form-group textInputWrapper">
                    <input autoComplete="off" type="password" placeholder="Password" id="password" value={signup.password} onChange={handleChange} required className='textInput' />
                  </div>
                  <div className="login-form-group textInputWrapper">
                    <input autoComplete="off" type="number" placeholder="Mobile" id="phone" value={signup.phone} onChange={handleChange} required className='textInput' />
                  </div>
                  <div className="login-form-group textInputWrapper">
                    <input autoComplete="off" type="number" placeholder="Age" id="age" value={signup.age} onChange={handleChange} required className='textInput' />
                  </div>
                  <button className="button-m-x mb-1" type='submit'>
                    <span>Register</span>
                    <div className="top green"></div>
                    <div className="left green"></div>
                    <div className="bottom green"></div>
                    <div className="right green"></div>
                  </button>
                </form>
                <div className="register-div">Goback ? <Link to="/login" className="link create-account pl-1"disabled={isButtonDisabled} > Login </Link></div>
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
                      <h2>Let’s Play and Share.</h2>
                      <p>M-A-X G-A-M-E-S</p>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
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
              theme="dark"/>

          </div>
        </div>
      </div>
    </>
  )
}
