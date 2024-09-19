import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loader } from "../../component/Loading";
import {
  getProductsRequest,
  getProductsFailure,
  getProductsSuccess,
} from "../../redux/Products/productAction";
import NavSecond from "../../component/header/NavSecond";
import "./products.css";
import { Form } from "react-bootstrap";

const Products = () => {
  const [filters, setFilters] = useState({ sort: "desc", category: "All", search: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((store) => store.products.products);

  // Function to fetch products with filters
  const getTodos = async() => {
    dispatch(getProductsRequest());
    return axios
      .get(
        `https://nykkabackend-cgkg.onrender.com/products?search=${filters.search}&category=${filters.category}&sort=${filters.sort}`
      )
      .then((res) => {
        dispatch(getProductsSuccess(res.data));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(getProductsFailure());
        setLoading(false);
      });
  };

  // Handle product navigation
  const shift = (id) => {
    navigate(`/product/${id}`);
  };

  // Use effect to fetch products on filter change
  useEffect(() => {
    getTodos();
  }, [filters]);

  // Handler for category and sorting changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <NavSecond />
      {loading ? (
        <Loader />
      ) : (
        <div className="pro_maind">
          <div className="p_sorted">
            <h3 style={{ color: "#fc2779", marginLeft: "10%", marginTop: "8%" }}>Filter By Category</h3>
            <Form>
            {["All", "Hair", "Lips", "Eyes", "Skin", "Nails", "Fragrances"].map((category) => (
              <Form.Check
                key={category}
                inline
                label={`\u00A0\u00A0${category}`}
                name="category"
                value={category.toLowerCase()}
                onChange={handleFilterChange}
                type="radio"
                id={`category-${category}`}
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  marginLeft: "10%",
                  marginTop: "4%",
                }}
                // Make "All" the default selected option
                defaultChecked={category === "All"}  // This will set "All" as the default
              />
            ))}
          </Form>
            <h3 style={{ color: "#fc2779", marginLeft: "10%", marginTop: "12%" }}>Filter By Price</h3>
            <Form>
              {["asc", "desc"].map((sortOption) => (
                <Form.Check
                  key={sortOption}
                  inline
                  label={sortOption === "asc" ? "Low To High" : "High To Low"}
                  name="sort"
                  value={sortOption}
                  onChange={handleFilterChange}
                  type="radio"
                  id={`sort-${sortOption}`}
                  style={{
                    fontSize: "17px",
                    fontWeight: "600",
                    marginLeft: "10%",
                    marginTop: "4%",
                  }}
                  defaultChecked={sortOption === "desc"}
                />
              ))}
            </Form>
          </div>

          <div className="main_pro">
            {product.map((e, i) => (
              <div key={i} onClick={() => shift(e._id)}>
                <img src={e.images} alt="" />
                <h2>{e.name}</h2>
                <div>
                  {[...Array(4)].map((_, index) => (
                    <i
                      key={index}
                      className="fa-solid fa-star"
                      style={{ color: "#fc2779", fontSize: "12px" }}
                    ></i>
                  ))}
                </div>
                <p style={{ fontWeight: "600" }}>MRP: ₹{e.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Products; 