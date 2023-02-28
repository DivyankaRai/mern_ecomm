import React from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SingleProduct.css";
import { Loader } from "../../component/Loading";
import {
  singleProductFailure,
  singleProductRequest,
  singleProductSuccess,
} from "../../redux/SingleProduct/singleProductAction";
import { addCartItems } from "../../redux/Cart/CartAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const SingleProduct = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.cartItems);
  const product = useSelector((store) => store.singleProduct.singleProducts);

  const { id } = useParams();
  const [spin, setspin] = useState(false);
  const [quantity, setquantity] = useState(1);

  const getProduct = () => {
    dispatch(singleProductRequest());
    return axios
      .get(`https://glowgirlbackend.onrender.com/product/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(singleProductSuccess(res.data));
      })
      .catch((err) => {
        dispatch(singleProductFailure());
      });
  };

  const incQuantity = () => {
    const quan = quantity + 1;
    setquantity(quan);
    console.log("inc");
  };

  console.log(product,"sedrtgyh")
  const decQuantity = () => {
    const quan = quantity - 1;
    setquantity(quan);
  };

  const addtoCart = async () => {
    try {
      dispatch(addCartItems(id, quantity));
      toast("🤩 Item added to Cart");
      nav("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  localStorage.setItem("cart", JSON.stringify(cart));

  useEffect(() => {
    getProduct();
    setTimeout(() => {
      setspin(false);
    }, 1300);
  }, []);

  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <div className="s_main">
          <div className="s_img">
            <img src={product.images} alt="" />
          </div>
          <div className="info">
            <div className="s_info">
              <h1>{product.name}</h1>
              <h3>{product.description}</h3>
              <h4>
                Rating: &nbsp;{product.rating}{" "}
                <i class="fa-solid fa-star" style={{ }}></i>
              </h4>
              <h4>MRP: &nbsp;&nbsp;₹ <span>{product.price}</span></h4>
              <p>inclusive of all taxes</p>
              <div className="btnss">
                <i
                  class="fa-solid fa-square-plus"
                  onClick={incQuantity}
                  // style={{ color: " #fc2779", fontSize: "30px" }}
                ></i>
                <h2>{quantity}</h2>
                <i
                  class="fa-solid fa-square-minus"
                  onClick={quantity > 1 ? decQuantity : ""}
                  // style={{ color: " #fc2779", fontSize: "30px" }}
                ></i>
              </div>
              <button className="button" onClick={addtoCart}>
                Add to Bag
              </button>
            </div>
            {/* <div className="last">

            </div> */}
          </div>
          <ToastContainer position="top-center"/>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
