import React, { useState } from "react";
import "./Login.css";

const Login = () => {

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  console.log(data);

  const handleSubmit = () =>{
    
  }

  return (
    <>
      <div className="login_div">
        <h1>Login</h1>
        <h4>Enter your Email</h4>
        <input className="input" type="text" onChange={handleChange} />
        <br />
        <h4>Enter your Password</h4>
        <input className="input" type="text" onChange={handleChange} />
        <br />
        <button className="buton" onClick={handleSubmit}>Login</button>
        <h5>Already have an account?</h5>
      </div>
    </>
  );
};

export default Login;
