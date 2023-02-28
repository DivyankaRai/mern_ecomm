import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../Pages/Register/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import axios from "axios";
import { addProductFailure, addProductRequest, addProductSuccess } from "../Redux/AdminAction";

const ProForm = () => {

  const user = useSelector(store => store.login.login)
  const dispatch = useDispatch();
  const [spin, setspin] = useState(true);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    images: "",
    category: "",
    stock: "",
  });

  console.log(user)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  let token = localStorage.getItem("usersdatatoken");
  console.log(data)

  const shippingSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, rating, images, category, stock } = data;


    if (
      (name == "" || description == "" || price == "" || rating == "" || images == "" || category == "" || stock == "")
    ) {
      toast.error("Please fill all the details");
    } else {
      try {
        dispatch(addProductRequest())
        const prodataa = await axios.post(
          "/add/product",
          { name, description, price, rating, images, category, stock },
          {
            headers: {
              authorization: token,
              role: user.role
            },
          }
        );
        console.log(prodataa);
        if(prodataa.status == 200){
          dispatch(addProductSuccess(prodataa.data))
          setdata({
            ...data,
            name: "",
            description: "",
            price: "",
            rating: "",
            images: "",
            category: "",
            stock: ""
          });
        }
        toast('Product added Successfully.')

      } catch (error) {
        dispatch(addProductFailure)
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setspin(false);
    }, 1300);
  }, []);

  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <div className="login_div">
          <h1>Add new product</h1>
          <input
            className="input"
            name="name"
            placeholder="Enter product name"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.name}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter product description"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.description}
          />
          <br />
          <br />
          <input
            className="input"
            type="number"
            name="price"
            placeholder="Enter product price"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.price}
          />
          <br />
          <br />
          <input
            className="input"
            type="url"
            name="images"
            placeholder="Enter product image Url"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.images}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="category"
            placeholder="Enter product category"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.category}
          />
          <br />
          <br />
          <input
            className="input"
            type="number"
            name="rating"
            placeholder="Enter product rating"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.rating}
          />
          <br />
          <br />
          <input
            className="input"
            type="text"
            name="stock"
            placeholder="Enter product stock"
            style={{ fontSize: "17px", textAlign: "center" }}
            onChange={handleChange}
            value={data.stock}
          />
          <br />
          <button className="buton" onClick={shippingSubmit} type="submit">
            Add
          </button>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default ProForm;
