import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./component/header/Navbar";
import NavSecond from "./component/header/NavSecond";
import "./App.css"
import Products from "./Pages/Products/Products";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleProduct from "./Pages/SingleProduct/SingleProduct";
import Home from './component/Home/Home';
import Login from './Pages/Register/Login';
import Carrousell from './component/Home/Banner';
import Signup from './Pages/Register/Signup';
import Cart from './Pages/Cart/Cart';


function App() {


  return (
    <>
    <Navbar />
    <NavSecond/>
    {/* <Login/> */}
    <Signup/>
    {/* <Carrousell/> */}
    {/* <Home/> */}
    {/* <Cart/> */}
    {/* <Slider/> */}
      {/* <Routes>
        <Route path="/" element={<Products /> } />
        <Route path="/product/:id" element={<SingleProduct /> } />
      </Routes> */}
    </>
  );
}

export default App;
