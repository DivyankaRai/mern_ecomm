import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/header/Navbar";
import NavSecond from "./component/header/NavSecond";
import "./App.css"
import Products from "./Pages/Products/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from "./Pages/SingleProduct/SingleProduct";


function App() {
  return (
    <>
    <Navbar />
    <NavSecond/>
    <Products/>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products /> } />
        <Route path="/product/:id" element={<SingleProduct /> } />
      </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
