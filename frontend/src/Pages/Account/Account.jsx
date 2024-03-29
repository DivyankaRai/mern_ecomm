import React, { useEffect, useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderData } from '../../redux/Login/loginAction'
import NavSecond from '../../component/header/NavSecond'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../component/Loading'

const Account = () => {

    const nav = useNavigate()
    const [spin, setspin] = useState(true);

    const {login,isAuthenticated} = useSelector(store => store.login)
    const {order} = useSelector(store => store.login)

    console.log(isAuthenticated)

    const dispatch = useDispatch()
    let token = localStorage.getItem("usersdatatoken");

    useEffect(() => {
      setTimeout(() => {
        setspin(false);
      }, 1300);
      dispatch(getOrderData(token))
    }, [])



  return (
    <>
          <NavSecond/>
          {
      spin ? (
        <Loader />
      ) : (
        <>
        <div className="acc">
        <div className='acimg'>
        <h1 className='achs'>Account Information</h1>
            <img src={`https://nykkabackend-cgkg.onrender.com/uploads/${login.profile}`} alt=''/>
        
        </div>


        <div className='accorder'>
        <h1 className='ach'>Account Information</h1>
            <h2 className='accht'>First Name:&nbsp;&nbsp;&nbsp;<span className='spanacc'>{login.fname}</span></h2>
            <h2 className='accht'>Last Name:&nbsp;&nbsp;&nbsp;<span className='spanacc'>{login.lname}</span></h2>
            <h2 className='accht'>Email:&nbsp;&nbsp;&nbsp;<span className='spanacc'>{login.email}</span></h2>
        </div>
          
          
      </div>
      {
        order.length > 0 ? <>
          <div className="order_m">
      <h1>Order Details</h1>
      <div className="order_p">
      {order.length > 0 ? (
              order.map((e) => {
                return (
                  <>
                  <div className="order_acc">
                  <h6>Previous Orders</h6>
                  {
                    e.orderItems.map((e)=>(
                        <div className='o_main'>
                        <img
                          src={e.image}
                          alt=""
                        />
                        <div className="o_h">
                        <h3>{e.name}</h3>
                        </div>
                        <div className="o_n">
                            <h4>MRP: ₹{e.price}</h4>
                        <h4>Quantity: {e.quantity}</h4>
                        <h4>{`Sub-total: ₹${e.price * e.quantity}`}</h4>
                        </div>
                    </div>
                    ))
                  }
                  </div>
                  </>
                );
              })
            ) : ""}
      </div>
      </div>
          </> : ""
      }
        </>
      )
}
    </>
  )
}

export default Account
