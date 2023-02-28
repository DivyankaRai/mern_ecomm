import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getSignupFailure, getSignupRequest, getSignupSuccess } from "../../redux/SignUp/signaction";

const Signup = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const [spin, setspin] = useState(true);
  const {isAuthenticated} = useSelector((store) => store.signUp)

  const [sdata, setsdata] = useState({
    fname:"",
    fname:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{

    const {name,value} = e.target
      setsdata({...sdata,[name]:value})
    }
  // console.log(sdata)

  const handleSubmit = async(e) =>{

    e.preventDefault();
    const { fname,lname,email,password} = sdata;

    if(fname==""){
      toast.error("Please enter your First Name")
    }
    else if(lname==""){
      toast.error("Please enter Last Name")
    }else if(email==""){
      toast.error("Please enter your Email")
    }
    else if(password==""){
      toast.error("Please enter your password")
    }
    else{
      const config = {
        headers:{
          "Content-Type": "application/json"
        }
      }
      dispatch(getSignupRequest())
      axios.post('http://localhost:8000/user/register',
        {fname,lname,email,password},
        config
      ).then((res) => {
        console.log(res)
        dispatch(getSignupSuccess(res.data.finalUser))
        nav('/login')
      }).catch((error) => {
        dispatch(getSignupFailure());
        console.log(error)
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setspin(false);
    }, 1300);
    if(isAuthenticated){
      toast('Signup Successfully')
    }
  }, [isAuthenticated,dispatch])

  return (
    <>
    {
      spin ? (
        <Loader />
      ) : (
        <div className="login_div">
        <h1>SignUp</h1>
        <input className="input" name='fname' type="text"  placeholder="Enter Your First Name" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input className="input" name='lname' type="text"  placeholder="Enter Your Last Name" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input className="input" name='email' type="text"  placeholder="Enter Your Email" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br /><br />
        <input  className="input" name='password' type="text"  placeholder="Enter Your Password" style={{fontSize: "17px", textAlign:"center"}}  onChange={handleChange} />
        <br />
        <button className="buton" type='submit' onClick={handleSubmit} >Signup</button>
        <h5>Don't have an account?</h5>
        <ToastContainer position="top-center"/>
      </div>
      )
    }
    </>
  );
};

export default Signup;
