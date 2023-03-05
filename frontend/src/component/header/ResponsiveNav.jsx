import { Divider } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./res.css"

const ResponsiveNav = ({user,isAuthenticated,drawerr}) => {
    console.log(user,isAuthenticated,"dfrtyuiuytr")
  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
        <h1 className='avtar2'>Signin</h1>
        </div>
        <div className="nav_btn" onClick={()=>{drawerr()}}>
            <Link to='/'>Home</Link>
            <Link to='/'>Categories</Link>
            <Link to='/'>Brands</Link>
            <Divider/>
            <Link to='/'>My Orders</Link>
            <Link to=''>Admin Dasboard</Link>
        </div>
      </div>
    </>
  )
}

export default ResponsiveNav
