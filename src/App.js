import "./App.css";
import React,{ useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AllProducts from "./Components/AllProducts";
import Signup from "./Components/Signup";
import ProductCategory from "./Components/ProductCategory";
import Cart from "./Components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import ProductDetails from "./Components/ProductDetails";

export const ProductHub = React.createContext();
function App() {
  let [cart ,setCart] = useState([]);
  let [cartValue,setCartValue] = useState(cart?.length);
  let [cartTotalPrice,setCartTotalPrice] = useState()

  return (
    <>
      <BrowserRouter>
        <ProductHub.Provider value={{cart ,setCart,cartValue,setCartValue,cartTotalPrice,setCartTotalPrice}}>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route
            path="/productdetails/:id"
            element={<ProductDetails />}
          />
          {/* <Route path="/payment" element={<Payment/>}/> */}
          <Route path="/categoryproduct/:id" element={<ProductCategory />} />
          {/* seleted product */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </ProductHub.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
