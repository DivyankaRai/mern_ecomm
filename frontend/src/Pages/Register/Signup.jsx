import React, { useState } from "react";
import "./Login.css";

const Signup = () => {

  const [data, setdata] = useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) =>{

    const {name,value} = e.target
    setdata({...data,[name]:value})

  }
  console.log(data)

  const handleSubmit = () =>{
    
  }

  return (
    <>
      <div className="login_div">
        <h1>SignUp</h1>
        <h4>Enter your Name</h4>
        <input className="input" name='name' type="text" onChange={handleChange} />
        <br />
        <h4>Enter your Email</h4>
        <input className="input" name='email' type="text" onChange={handleChange} />
        <br />
        <h4>Enter your Password</h4>
        <input className="input" name='password' type="text" onChange={handleChange} />
        <br />
        <button className="buton" type='submit' onClick={handleSubmit} >Login</button>
        <h5>Don't have an account?</h5>
      </div>
    </>
  );
};

export default Signup;
