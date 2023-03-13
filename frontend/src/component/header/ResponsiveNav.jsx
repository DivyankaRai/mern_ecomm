import { Divider } from '@mui/material'
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom'
import { getLogoutUser } from '../../redux/Login/loginAction'
import { useDispatch, useSelector } from "react-redux";
import "./res.css"

const ResponsiveNav = ({user,isAuthenticated,drawerr}) => {

  const nav = useNavigate()
  const dispatch = useDispatch();

   const admin = () => {
    if(user.login.role === "admin"){
      nav('/admin')
    }
    else{
      alert('Sorry you are not an Admin!')
    }
  }

    const logoutuser = async() => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token)

    const res = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        }
    });

    const data = await res.json();

    if (data.status == 201) {
      dispatch(getLogoutUser())
      isAuthenticated=false
        toast('User logged out Successfully')
        localStorage.removeItem("usersdatatoken");
    } else {
    }
}

const signin = () =>{
  nav('/signup')
}

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {
             user.isAuthenticated ?
             <h1  className='avtar2'>{user.login.fname}</h1>
              : 
           <h1 className='avtar2' onClick={()=>{signin();drawerr()}} >Signin</h1>
          }
        {/* <h1 className='avtar2'>Signin</h1> */}
        </div>
        <div className="nav_btn" onClick={()=>{drawerr()}}>
            <Link to='/'>Home</Link>
            <Link to='/pro'>Categories</Link>
            <Link to='/pro'>Brands</Link>
            <Divider/>
            <Link to='' onClick={()=>admin()}>Admin Panel</Link>
            <Link to='/account'>My Account</Link>
            <Link to='' onClick={()=>logoutuser()}>Logout</Link>
        </div>
      </div>
    </>
  )
}

export default ResponsiveNav
