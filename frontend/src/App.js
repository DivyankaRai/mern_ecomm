// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/header/Navbar";
import NavSecond from "./component/header/NavSecond";
import "./App.css"
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Home from './component/Home/Home';
import Login from './Pages/Register/Login';
import Signup from './Pages/Register/Signup';
import Cart from './Pages/Cart/Cart';    
import Shipping from './Pages/Shipping/Shipping';
import Dash from './Dash';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './redux/Login/loginAction';
import { useEffect, useState } from 'react';
import Order from './Pages/Shipping/Order';
import axios from 'axios';
import Payment from './Pages/Payment';
import store from './store'
import ProForm from "./Admin/AdminPages/ProForm";
import AdminPanel from "./Admin/AdminPages/AdminPanel";


function App() {

  const dispatch = useDispatch()
  let token = localStorage.getItem("usersdatatoken");
  const {login,isAuthenticated} = useSelector(store => store.login)


  console.log(login,isAuthenticated)
  useEffect(() => {
    dispatch(getUserData(token))
  }, [])

  return (
    <>
    <Navbar user={{login,isAuthenticated}} />
    <NavSecond/>
    {/* <Order/> */}
      <Routes>
      <Route path='/adminform' element={<ProForm/>}/>
        <Route path='/admin' element={<AdminPanel/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/shipping" element={<Shipping /> } /> 
        <Route path="/" element={<Home /> } />
        <Route path="/pro" element={<Products /> } />
        <Route path="/order" element={<Order /> } />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/product/:id" element={<SingleProduct /> } />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/payment' element={<Payment/>} />
      </Routes>
    </>
  );
}

export default App;
