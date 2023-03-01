import React,{ useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserSuccess } from '../Redux/AdminAction';
import './AllUser.css'

const AllUsers = () => {

    const dispatch = useDispatch();
    const allUser = useSelector(store => store.admin.allUser)
    const user = useSelector(store => store.login.login)
    const token = localStorage.getItem('usersdatatoken')
    localStorage.setItem('userLen',JSON.stringify(allUser.length))

    const getTodos = async() => {
      return axios
      .get(`http://localhost:8000/user/details`,{
                      headers: {
                          "Content-Type": "application/json",
                          "authorization": token,
                          }
                      })
      .then((res) => {
        dispatch(getUserSuccess(res.data));
      })
      .catch((err) => {
      })
    };

    const deleteProduct = async(id) => {
      console.log(id)
      try {
        const delData = axios.delete(`http://localhost:8000/delete/user/${id}`, {
                    headers: {
                        authorization: token,
                       role: user.role
                    },
                  })
                  // toast("Product deleted Successfully")
                  getTodos()
                  console.log(allUser)
        console.log(delData)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(() => {
      getTodos()
    }, [])
   

  return (
    <>
      <div className="users_main">
        {
            allUser.map((e,i)=>{
                return(
                    <>
                        <div>
                            <h2>First Name: &nbsp;&nbsp;<span>{e.fname}</span></h2>
                            <h2>Last Name: &nbsp;&nbsp;<span>{e.lname}</span></h2>
                            <h2>Email: &nbsp;&nbsp;<span>{e.email}</span></h2>
                            <h2>Role: &nbsp;&nbsp;<span>{e.role}</span></h2>
                            <button onClick={()=>{deleteProduct(e._id)}}>Delete</button>
                        </div>
                    </>
                )
            })
        }
      </div>
    </>
  )
}

export default AllUsers
