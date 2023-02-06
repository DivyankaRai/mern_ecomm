import React from 'react'
import data from './data'
import "./products.css"
import {Link} from "react-router-dom"
import { useState, useReducer } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useContext } from 'react'
import { Store } from '../../store'

const Products = () => {

  const reducer = (state,action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {...state, loading:true};
      case 'FETCH_SUCCESS':
        return {...state, productData:action.payload, loading:false};
      case 'FETCH_FAIL': 
        return {...state, loading:false, error:action.error}
      default:
        return state;
    }
  }
    
  const [ {loading,error,productData}, dispatch] = useReducer(reducer, {
    productData:[],
    loading:true,
    error:''
  })

  const getData = async() =>{
    dispatch({type: 'FETCH_REQUEST'})
    try {
      const res = await axios.get('http://localhost:8000/products')
      dispatch({type: 'FETCH_SUCCESS', payload:res.data.produts })
    } catch (error) {
      console.log(error);
      dispatch({type: 'FETCH_FAIL', payload:error.message })
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
    <div className="main">
    {
        productData.map( (e,i) =>{
            return(
                <>
                <div>
                    <Link to={`/product/${e.id}`}>
                    <img src={e.image} alt="img" />
                    </Link>
                    <h1>{e.name}</h1>
                    <p>{e.desc}</p>
                    <p>{e.price}</p>
                    {/* <p>{Math.ceil(`${e.rating}`)}</p> */}
                    <button onClick={handleCart}>Add To Cart</button>
                </div>
                </>
            )
        })
      }
    </div>
      
    </>
  )
}

export default Products
