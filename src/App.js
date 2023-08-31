import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import AllProducts from "./Components/pages/products/AllProducts";
import Signup from "./Components/pages/Signup";
import ProductCategory from "./Components/pages/products/ProductCategory";
import Cart from "./Components/pages/Cart";
import ProductDetails from "./Components/pages/products/ProductDetails";
import { getItem } from "./config/cookieStorage";

export const ProductHub = React.createContext();

function Public() {
  const isSignedIn = getItem("token");
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartValue, setCartValue] = useState(cart?.length);

  return (
    <>
      <BrowserRouter>
        <ProductHub.Provider
          value={{
            cart,
            setCart,
            cartValue,
            setCartValue,
          }}
        >
          {/* <Header /> */}
          <Routes>
            <Route index element={<Home />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            {/* <Route path="/payment" element={<Payment/>}/> */}
            <Route path="/categoryproduct/:id" element={<ProductCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/*" element={<Public />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster position="top-center" reverseOrder={false}>
            {(t) => (
              <ToastBar toast={t}>
                {({ icon, message }) => (
                  <>
                    {icon}
                    {message}
                    {t.type !== "loading" && (
                      <sapn
                        style={{ cursor: "pointer" }}
                        onClick={() => toast.dismiss(t.id)}
                      >
                        <CloseIcon fontSize="small" />
                      </sapn>
                    )}
                  </>
                )}
              </ToastBar>
            )}
          </Toaster>
        </ProductHub.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
