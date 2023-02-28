import React from "react";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProductsFailure, getProductsRequest, getProductsSuccess } from "../../redux/Products/productAction";
import { useState } from "react";
import { useEffect } from "react";
import { getLogoutUser, getUserData } from "../../redux/Login/loginAction";


const Navbar = ({user,isAuthenticated}) => {


  // console.log(user.isAuthenticated)
  const nav = useNavigate()

  const [search, setsearch] = useState("")
  const [sort, setsort] = useState("desc")
  const [category, setcategory] = useState("All")
  const [open, setopen] = useState(false)
  const [loginopen, setloginopen] = useState(false)

  const product = useSelector((store) => store.products.products);
  const dispatch = useDispatch();

  const getTodos = () => {
    dispatch(getProductsRequest());

    return axios
      // .get(`http://localhost:8000/products?search=${search}&category=${category}&sort=${sort}`)
      .get(`https://glowgirlbackend.onrender.com/products?search=${search}&category=${category}&sort=${sort}`)
      .then((res) => {
        // console.log(res.data)
        dispatch(getProductsSuccess(res.data));
        setopen(true)
      })
      .catch((err) => {
        dispatch(getProductsFailure());
      });
  };


  // log out
  const logoutuser = async() => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token)

    const res = await fetch("http://localhost:8000/user/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        }
    });

    const data = await res.json();

    if (data.status == 201) {
      dispatch(getLogoutUser())
      isAuthenticated=false
        toast('User logged out Successfully')
        localStorage.removeItem("usersdatatoken");
    } else {
    }
}

  const admin = () => {
    if(user.login.role === "admin"){
      nav('/admin')
    }
    else{
      toast.error('Sorry you are not an Admin!')
    }
  }

  const searchbox = () => {
    setopen(false)
    setsearch("")
  }
  
  useEffect(() => {
    getTodos();
  }, [search]);

  return (
    <>
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <img
              src="sPvp9PT05vhRvzFaHDuxPn0BPr8AQ+FBz5xSP1b80j2pqtvvFqlI8DZW2j9Fv7w/7he0vj/Ym3Jdn5ZL/n6xoPzE0r+04XPdB/n/9uG/PU/vbv8hr8dkZ40Efzr/3+goooqqqiiiiqqqKKKKqqooooqqqiiiiqqqKKKKqqooooqqqiiiiqqqKKKKqqooooqqqiiiiqqqKKKKvq/of8BY/43GgAqZkoAAAAASUVORK5CYII="
              alt=""
            />
          </div>
          <div className="nav_searchbaar">
            <input
              placeholder="Search on  Glow girl"
              type="text"
              onChange={(e)=>setsearch(e.target.value)}
              style={{ fontSize: "17px", textAlign: "center", 
              backgroundColor:"rgb(246, 236, 236)" }}
              value={search}
            />
            <div className="search_icon">
              <i
                class="fa-solid fa-magnifying-glass"
                style={{ color: "white" }}
              ></i>
            </div>
            {/* search */}
            {
              search && open && <div className="searchbox" >
                {
                  product.map((e,i)=>{
                    return(
                      <>
                      <Link to={`/product/${e._id}` }>
                      <div className="list_div" onClick={searchbox}>
                        <img style={{height:"50px", width:"80px"}} src={e.images} alt=''/>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {e.name}
                        </div>
                      </Link>
                      </>
                    )
                  })
                }
            </div>
            }
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            {
              user.isAuthenticated ? <>
              {/* onClick={()=>{logoutuser()}} */}
                <a onClick={()=>{setloginopen(!loginopen)}}>{user.login.fname}&nbsp;&nbsp;<i class="fa-solid fa-angle-down"></i></a>
                {
                  loginopen ? <>
                    <div className="loginbox">
                      <div className="logout" onClick={()=>{logoutuser()}} >
                        <h1>Logout</h1>
                      </div>
                      <div className="adminn" onClick={()=>admin()} >
                        <h1>Admin Panel</h1>
                      </div>
                    </div>
                  </> : ""
                }
              </>
                 : 
              <Link to='/login'><a>Signin</a></Link>
            }
          </div>
          <div className="cart_btn" >
          <Link to='/cart'>
            {/* Cart */}
             <i class="fa-solid fa-bag-shopping" style={{ fontSize: "33px", color: "#fc2779"}} ></i>
          </Link>
          </div>
          <Link to='/pro'>
          <i class="fa-solid fa-heart" style={{ fontSize: "30px", color: "#fc2779", cursor: "pointer"}} ></i>
          </Link>
          
        </div>
      </nav>
      <ToastContainer position="top-center"/>
    </header>
    </>
  );
};

export default Navbar;
