import React, { useState } from 'react';
import "./Login.css"

const Login = () => {

    return (
      <>
       <div className='login_div'>
          <h1>Login</h1>
          <h4>Enter your Email</h4>
          <input input type="text" /><br/>
          <h4>Enter your Password</h4>
          <input className='input' type="text" /><br/>
          <button>Login</button>
          <h5>Already have an account?</h5>
       </div>
      </>
    );
}

export default Login

