import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import axios from "axios";
import { getProductsFailure, getProductsRequest, getProductsSuccess } from '../../redux/Products/productAction';
import SmallNav from './SmallNav';

const AdminPanel = () => {

  const [sort, setsort] = useState("desc")
  const [category, setcategory] = useState("All")
  const [search, setsearch] = useState("")
  const nav = useNavigate()


  const user = useSelector(store => store.login.login)
  const product = useSelector((store) => store.products.products);
  let token = localStorage.getItem("usersdatatoken");
  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(getProductsRequest());

    return axios
      .get(`https://nykkabackend-cgkg.onrender.com/products?search=${search}&category=${category}&sort=${sort}`)
      .then((res) => {
        dispatch(getProductsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getProductsFailure());
      });
  };

  const deleteProduct = async(id) => {
    console.log(id)
    try {
      const delData = axios.delete(`https://nykkabackend-cgkg.onrender.com/delete/product/${id}`, {
                  headers: {
                      authorization: token,
                     role: user.role
                  },
                })
                toast("Product deleted Successfully")
                getTodos()
      console.log(delData)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getTodos();
  }, [category,sort]);

  return (
    <>
    <SmallNav/>
       <div className='admin_pro_maind'>
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
      <div className='bagg'>
        {product.map((e, i) => {
          return (
            <>
              <div className="cartadmin">
                  <img
                    src={e.images}
                    alt=""
                  />
                  <div className="priadmin">
                    <h3>{e.name}</h3>
                    <h4>MRP: ₹{e.price}</h4>
                  </div>
                  <div className="btnss">
                      <Link to={`/product/${e._id}`}>
                      <i
                        class="fa-solid fa-eye"
                        style={{ color: "blue", fontSize: "21px" }}
                      ></i>
                    </Link>
                    <Link to={`edit/product/${e._id}`}>
                    <i
                      class="fa-solid fa-edit"
                      style={{ color: "green", fontSize: "21px" }}
                    ></i>
                    </Link>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => {
                        deleteProduct(e._id);
                      }}
                      style={{ color: "red", fontSize: "21px" }}
                    ></i>
                  </div>
                </div>
            </>
          );
        })}
      </div>
    </div>
    </>
  )
}

export default AdminPanel
