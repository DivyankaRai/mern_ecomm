import React, { useEffect } from 'react'
import './payment.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderFailure, getOrderRequest, getOrderSuccess } from '../redux/Order/OrderAction'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'
import { addCartItems } from '../redux/Cart/CartAction'

const Payment = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()

  const data = JSON.parse(sessionStorage.getItem('orderInfo'))
  console.log(data)
  let token = localStorage.getItem("usersdatatoken");
  console.log(token)

   const user = useSelector(store => store.login)
   const {order,isSuccess} = useSelector(store => store.order)
   console.log(order,"drtyui",isSuccess)
     
    const cart = useSelector((store) => store.cart.cartItems)
    const ship = useSelector((store) => store.cart.shippingInfo)

    const subtotal = cart.reduce((acc,e)=> acc+e.quantity*e.price,0)

    const shippingPrice = subtotal > 1000 ? 0 : 200
    const total = subtotal + shippingPrice


  const handleSubmit = async(e) =>{
    e.preventDefault();

    const orderData = {
      userData:{
        "address":ship.address,
        "city":ship.city,
        "state":ship.state,
        "phoneNo":ship.phone,
      },
      orderItems : cart,
      itemsPrice: subtotal,
      shippingPrice: shippingPrice,
      totalPrice: total
    }
    // console.log(orderData)
    const dataa = await axios.post(
      'https://glowgirlbackend.onrender.com/order',
      orderData,
      {
        headers:{
          authorization: token
        }
      }
    )
    console.log(dataa)
    dispatch(getOrderSuccess(dataa.data))
}

  useEffect(() => {
    if(isSuccess === true){
      localStorage.removeItem("cart");
      dispatch(addCartItems(null))
      sessionStorage.removeItem("orderInfo");
      alert('Your Payment has been done')
      nav('/')
    }
  }, [isSuccess])

  return (
    <>
       <div className="pay_div">
        <h1>Payment Details</h1>
        <input className="input" name="email" type="text" 
        placeholder="Enter Card holder Name"
         style={{fontSize: "17px", textAlign:"center"}}
          />
        <br />
        <br/>
        <input className="input" name="password" maxLength={'16'}
        placeholder="Enter Card Number"
        style={{fontSize: "17px", textAlign:"center"}} 
         />
        <button className="buton" onClick={handleSubmit}>Pay ₹{data.total}</button>
      </div>
    </>
  )
}

export default Payment
