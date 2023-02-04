import React from 'react'
import {Link, useParams} from "react-router-dom"
import {useReducer } from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"
import "./SingleProduct.css"
import { Loader } from '../../component/Loading'

const SingleProduct = () => {
  const [get, setget] = useState()
  setget(0)

  const id = useParams()
  const [spin, setspin] = useState(true)

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
      const res = await axios.get('http://localhost:8000/products/2')
      dispatch({type: 'FETCH_SUCCESS', payload:res.data.produts })
    } catch (error) {
      console.log(error);
      dispatch({type: 'FETCH_FAIL', payload:error.message })
    }
  }

  useEffect(() => {
    getData()
    setTimeout(() => {
      setspin(false)
    }, 1200);
  }, [])

  return (
    <>
      {
        spin ? <Loader/>: 
        <div className="s_main">
        <div className='s_img'>
            <img src='https://images-static.nykaa.com/creatives/9ebcba8c-fc59-449f-a042-126bc020a075/default.jpg?tr=w-240,cm-pad_resize' alt=''/>
        </div>
        <div className='info'>
          <div className="s_info">
          <h4>Kama Ayurveda Eladi Hydrating Face Cream</h4>
          <p>wertyuiuyt54 sdfgtyhujikol sdfghjkl asdftyuio sdfghjk werftgyhjk</p>
          <h5>⭐⭐⭐⭐⭐⭐</h5>
          <h5>MRP: ₹375</h5>
          <p>inclusive of all taxes</p>
          <button>Add to Bag</button>
          </div>
          <div className="last">
asdfghjk{get}
          </div>
        </div>
    </div>
      }
   
    </>
  )
}

export default SingleProduct