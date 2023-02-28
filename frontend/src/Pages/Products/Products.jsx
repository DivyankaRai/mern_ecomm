// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import "./products.css";
import axios from "axios";
import {
  getProductsRequest,
  getProductsFailure,
  getProductsSuccess,
} from "../../redux/Products/productAction";

const Products = () => {

  const [sort, setsort] = useState("desc")
  const [category, setcategory] = useState("All")
  const [search, setsearch] = useState("")
  const nav = useNavigate()


  const product = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(getProductsRequest());

    return axios
      .get(`https://glowgirlbackend.onrender.com/products?search=${search}&category=${category}&sort=${sort}`)
      .then((res) => {
        // console.log(object)
        dispatch(getProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getProductsFailure());
      });
  };

  console.log(category)

  const shift = (id) => {
    console.log(id)
    nav(`/product/${id}`)
  }
  
  useEffect(() => {
    getTodos();
  }, [category,sort]);

  return (
    <div className='pro_maind'>
    <div className="sorted">
        <div className="s2">
        <h3 style={{color:"#fc2779",marginLeft: "10%",marginTop: "8%"}}>Filter By Category</h3>
        <Form>
      {['radio'].map((type) => (
        <div className="mb-5">
          <Form.Check
            inline
            label="&nbsp;&nbsp;All"
            name="group1"
            value="All"
            onChange={(e)=>setcategory(e.target.value)}
            type={type}
            id={`inline-${type}-2`}
            style={{fontSize:"17px", fontWeight: "600", marginLeft: "10%",marginTop: "8%",
            }}
          />
          <Form.Check
            inline
            label="&nbsp;&nbsp;Hair"
            name="group1"
            value="hair"
            onChange={(e)=>setcategory(e.target.value)}
            type={type}
            id={`inline-${type}-3`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%",
            }}
          />
           <Form.Check
            inline
            label="&nbsp;&nbsp;Lips"
            name="group1"
            value="lips"
            onChange={(e)=>setcategory(e.target.value)} 
            type={type}
            id={`inline-${type}-2`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
          <Form.Check
            inline
            label="&nbsp;&nbsp;Eyes"
            name="group1"
            value="eyes"
            onChange={(e)=>setcategory(e.target.value)}
            type={type}
            id={`inline-${type}-3`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
           <Form.Check
            inline
            label="&nbsp;&nbsp;Skin"
            name="group1"
            value="skin"
            onChange={(e)=>setcategory(e.target.value)} 
            type={type}
            id={`inline-${type}-2`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
          <Form.Check
            inline
            label="&nbsp;&nbsp;Nails"
            name="group1"
            value="nails"
            onChange={(e)=>setcategory(e.target.value)}
            type={type}
            id={`inline-${type}-3`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
           <Form.Check
            inline
            label="&nbsp;&nbsp;Fragrances"
            name="group1"
            value="fragrances"
            onChange={(e)=>setcategory(e.target.value)}
            type={type}
            id={`inline-${type}-3`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
        </div>
      ))}
    </Form>
        </div>
        <div className="s2">
        <h3 style={{color:"#fc2779",marginLeft: "10%",marginTop: "12%"}}>Filter By Price</h3>
        <Form>
      {['radio'].map((type) => (
        <div  key={`inline-${type}`} className="mb-5">
          <Form.Check
            inline
            label="&nbsp;&nbsp;Low To High"
            name="group1"
            value="asc"
            onChange={(e)=>setsort(e.target.value)} 
            type={type}
            id={`inline-${type}-2`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "7%"}}
          />
          <Form.Check
            inline
            label="&nbsp;&nbsp;High To Low"
            name="group1"
            value="desc"
            onChange={(e)=>setsort(e.target.value)} 
            type={type}
            id={`inline-${type}-3`}
            style={{fontSize:"17px", fontWeight: "600",marginLeft: "10%",marginTop: "4%"}}
          />
        </div>
      ))}
    </Form>
        </div>
        <div className="opt">
        <form action="">
          <select onChange={(e)=>setcategory(e.target.value)}>
            <option value="All">Filter by Category</option>
            <option value="lips">Lips</option>
            <option value="eyes">Eyes</option>
            <option value="hair">Hair</option>
            <option value="skin">Skin</option>
            <option value="nails">Nails</option>
            <option value="fragrances">Fragrances</option>
          </select>
          </form>
        </div>
        <div className="opt2">
        <form action="">
          <select onChange={(e)=>setsort(e.target.value)} >
            <option value="">Filter by Price</option>
            <option value="asc">Low to high</option>
            <option value="desc">High to low</option>
          </select>
          </form>
        </div>
    </div>
      <div className="main">
        {product.map((e, i) => {
          return (
            <>
              <div onClick={()=>shift(e._id)}>
                  <img src={e.images} alt="img" />
                <h2>{e.name}</h2>
                <div><i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                <i class="fa-solid fa-star" style={{color:"#fc2779", fontSize:"12px"}}></i>
                </div>
                <p>MRP: ₹{e.price}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Products;