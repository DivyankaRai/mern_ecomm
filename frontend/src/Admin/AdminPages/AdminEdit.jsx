import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../Pages/Register/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../component/./Loading";
import axios from "axios";
import { singleProductSuccess } from "../../redux/SingleProduct/singleProductAction";
import { editProductSuccess } from "../Redux/AdminAction";

const AdminEdit = () => {

    const { id } = useParams();

    const user = useSelector(store => store.login.login)
    const nav = useNavigate()
    let token = localStorage.getItem("usersdatatoken");
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


    const getProduct = () => {
    return axios
      .get(`https://glowgirlbackend.onrender.com/product/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(singleProductSuccess(res.data));
        setdata(res.data)
      })
      .catch((err) => {
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };


  const shippingSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, rating, images, category, stock } = data;


    if (
      (name == "" || description == "" || price == "" || rating == "" || images == "" || category == "" || stock == "")
    ) {
      toast.error("Please fill all the details");
    } else {
      try {
        const prodataa = await axios.put(
          `/update/product/${id}`,
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
          dispatch(editProductSuccess(prodataa.data))
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
        // alert('Product Updated Successfully.')
        nav('/admin')

      } catch (error) {
      }
    }
  };

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
        <div className="login_div">
          <h1>Edit product</h1>
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
            Edit
          </button>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  )
}

export default AdminEdit
