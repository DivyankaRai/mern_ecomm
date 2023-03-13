import React from 'react'
import { Link } from 'react-router-dom'

const SmallNav = () => {
  return (
    <div className='new_nav'>
      <div className="nav_data">
        <div className="left_data">
          <Link to='/adminform' style={{textDecoration: 'none'}}><p>Add Products</p></Link>
          <Link to='/users' style={{textDecoration: 'none'}}><p>All Users</p></Link>
          <Link to='/landing' style={{textDecoration: 'none'}}><p>Dashboard</p></Link>
        </div>
        <div className="right_data">

        </div>
      </div>
    </div>
  )
}

export default SmallNav
