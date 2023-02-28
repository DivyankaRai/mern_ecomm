import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import "./Login.css";
import { getLoginFailure, getLoginRequest, getLoginSuccess, getUserData } from "../../redux/Login/loginAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";

const Login = () => {
  
  const nav = useNavigate()

  const [spin, setspin] = useState(true);
  const dispatch = useDispatch()
  const {error,isAuthenticated} = useSelector(store => store.login)

  const [data, setdata] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = (e) =>{
      e.preventDefault();

      const {email,password} = data;

      if(email==""){
        toast.error("Please enter your Email")
      }
      else if(password==""){
        toast.error("Please enter your password")
      }
      else{
        const config = {
          headers:{
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
        dispatch(getLoginRequest())
  
        return axios.post('https://glowgirlbackend.onrender.com/user/login',
            {email,password},
            config
          ).then((res) => {
            console.log(res.data.result.token)
            dispatch(getLoginSuccess(res.data.result.userValid))
            if(res.status === 201){
              localStorage.setItem("usersdatatoken",res.data.result.token);
              toast('User logged in Successfully')
            }
          }).catch((err) => {
            console.log(err)
            dispatch(getLoginFailure());
          });
      }
  }

  useEffect(() => {
    setTimeout(() => {
      setspin(false);
    }, 1300);
    if(isAuthenticated){
      nav('/')
    }
  }, [isAuthenticated])


  return (
    <>
    {
      spin ? (
        <Loader />
      ) : (
        <div className="login_div">
        <h1>Welcome back</h1>
        {/* <h4>Enter your Email</h4> */}
        <input className="input" name="email" type="text" placeholder="Enter Your Email" style={{fontSize: "17px", textAlign:"center"}} onChange={handleChange} />
        <br />
        <br/>
        {/* <h4>Enter your Password</h4> */}
        <input className="input" name="password" type="text" placeholder="Enter Your Password" style={{fontSize: "17px", textAlign:"center"}} onChange={handleChange} />
        {/* <br /> */}
        <button className="buton" onClick={handleSubmit}>Login</button>
        <h5>Already have an account?</h5>
        <ToastContainer position="top-center"/>
      </div>
       )}
    </>
  );
};

export default Login;
