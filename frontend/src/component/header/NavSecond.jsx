import React from 'react'
import { Link } from 'react-router-dom'
import "./Navsecond.css"

const NavSecond = () => {
  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
          <Link to='/pro' style={{textDecoration: 'none'}}><p>Categories</p></Link>
            
            <p>Beauty Advice</p>
            <p>Brands</p>
            <p>Makeup</p>
            <p>Skin</p>
            <p>Hair</p>
            <p>Fragrances</p>
        </div>
        <div className="right_data">

        </div>
      </div>
    </div>
  )
}

export default NavSecond
