import React from 'react'
import "./Login.css"

const Signup = () => {
  return (
    <>
      <div className='login_div'>
          <h1>SignUp</h1>
          <h4>Enter your Name</h4>
          <input className='input' type="text" /><br/>
          <h4>Enter your Email</h4>
          <input className='input' type="text" /><br/>
          <h4>Enter your Password</h4>
          <input className='input' type="text" /><br/>
          <button>Login</button>
          <h5>Don't have an account?</h5>
       </div>
    </>
  )
}

export default Signup
