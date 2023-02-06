import React from "react";
import "./Navbar.css";
import Badge from 'react-bootstrap/Badge';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import StoreProvider, { Store } from '../../store';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import Avatar from '@mui/material/Avatar';

const Navbar = () => {

  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          </div>
          <div className="nav_searchbaar">
            <input
              placeholder="Search on  Glow girl"
              type="text"
              style={{ fontSize: "17px", textAlign: "center", backgroundColor:"rgb(246, 236, 236)" }}
            />
            <div className="search_icon">
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ color: "white" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <a>Signin</a>
          </div>
          <div className="cart_btn">
          <Link to='/cart'>
            Cart
            {/* <i class="fa-solid fa-bag-shopping" style={{ fontSize: "33px", color: "#fc2779"}} ></i>
            {
              cart.cartItems.length > 0 ? 
                <Badge bg="light" style={{color: "#fc2779", fontSize:"14px"}} >
                {cart.cartItems.length}
                </Badge> : "No"
            } */}
          </Link>
          </div>
          <i class="fa-solid fa-heart" style={{ fontSize: "30px", color: "#fc2779", cursor: "pointer"}} ></i>
          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
