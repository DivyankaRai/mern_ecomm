import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems } from "../../redux/Cart/CartAction";
import "./cart.css";
import { getUserData } from "../../redux/Login/loginAction";
import axios from "axios";
import { Loader } from "../../component/Loading";

const Cart = () => {

  const [spin, setspin] = useState(true)
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart.cartItems);

  const user = useSelector((store) => store.login);
  const nav = useNavigate();

  const incQuantity = (e) => {
    const id = e._id;
    const newquan = e.quantity + 1;
    // console.log(id, newquan);
    dispatch(addCartItems(id, newquan));
  };

  const decQuantity = (e) => {
    const id = e._id;
    const newquan = e.quantity - 1;
    // console.log(id, newquan);
    dispatch(addCartItems(id, newquan));
  };

  const subtotal = cart.reduce((acc, e) => acc + e.quantity * e.price, 0);
  // console.log(subtotal);

  const ship = () => {
    if (user) {
      nav("/shipping");
    } else {
      nav("/signup");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setspin(false)
    }, 1300);
  },[])

  const shipp = subtotal > 2000 ? 0 : 100

  return (
    <>
    {
      spin ? <Loader/>: 
      <div className="fir_div">
      <div className="bagsumm">
        <h1>Bag Summary</h1>
        {cart.length > 0 ? (
          cart.map((e) => {
            return (
              <>
                <div className="cart">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0906/2558/products/07_2367a931-b52d-41ff-b242-f197329f398b.jpg?v=1677068145"
                    alt=""
                  />
                  <div className="pri">
                    <h3>{e.name}</h3>
                    <h4>MRP: ₹{e.price}</h4>
                    <h5>{`Sub-total: ₹${e.price * e.quantity}`}</h5>
                  </div>
                  <div className="btnss">
                    <i
                      class="fa-solid fa-square-plus"
                      onClick={() => {
                        incQuantity(e);
                      }}
                      style={{ color: " #fc2779", fontSize: "25px" }}
                    ></i>
                    <h2>{e.quantity}</h2>
                    <i
                      class="fa-solid fa-square-minus"
                      onClick={() => {
                        decQuantity(e);
                      }}
                      style={{ color: " #fc2779", fontSize: "25px" }}
                    ></i>
                  </div>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => {
                      dispatch(removeCartItems(e._id));
                    }}
                    style={{ color: "gray", fontSize: "29px" }}
                  ></i>
                </div>
              </>
            );
          })
        ) : "Your Shopping Bag is Empty"}
      </div>
      <div className="priDet">
        <h1>Price Details</h1>
        <div className="prid">
        <div className="cartpri">
            <h3>Total Items:</h3>
            <h3>{cart.length}</h3>
          </div>
          <div className="cartpri">
            <h3>Total Price:</h3>
            <h3>₹{subtotal}</h3>
          </div>
          <div className="cartpri">
            <h3>Shipping Price:</h3>
            <h3>₹{shipp}</h3>
          </div>
          <button className="pbtn" onClick={ship}>Proceed To Checkout</button>
        </div>
      </div>

    </div>
    }
    </>
  );
};

export default Cart;
