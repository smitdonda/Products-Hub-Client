import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductHub } from "../../App";
import Payment from "./Payment";
import MainLayout from "../containers/MainLayout";

function Cart() {
  let context = useContext(ProductHub);
  let cartPrice = 0;

  const handleDelete = (i) => {
    context.cart.splice(i, 1);
    context.setCartValue(context.cart.length);
  };

  // QTY
  let [value, setValue] = useState(context.cart);
  let [anotherSetValue, setAnotherValue] = useState();
  const increment = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    let result = (value[index].qty += 1);
    setAnotherValue(result);
    context.setCartTotalPrice(cartPrice);
  };

  const decrement = (e) => {
    let index = context.cart.findIndex((c) => c.name === e.name);
    if (value[index].qty > 1) {
      let result = (value[index].qty -= 1);
      setAnotherValue(result);
      context.setCartTotalPrice(cartPrice);
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid">
        <div className="mt-2 mb-5 cart-div row">
          {context.cart.length > 0 ? (
            <>
              {context.cart?.map((e, i) => {
                console.log(e);
                anotherSetValue
                  ? (cartPrice = cartPrice + Number(e.price) * anotherSetValue)
                  : (cartPrice = cartPrice + Number(e.price));
                return (
                  <div
                    key={i}
                    className="text-center p-4 m-3 col description "
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <Link
                      to={`/productdetails/` + e._id}
                      className="text-decoration-none text-dark"
                    >
                      <img src={e?.images[0]} alt="name" width="300px" />
                      <div className="pt-3">
                        <h6 className="category">{e.name}</h6>
                      </div>
                      <p className="text-center title">
                        &#8377;&nbsp;{e.price}
                      </p>
                      <p>Size:&nbsp;{e.selectedsize}</p>
                    </Link>
                    <div className="m-4">
                      <Button
                        className="shadow-none"
                        onClick={() => {
                          decrement(e);
                        }}
                      >
                        -
                      </Button>
                      &nbsp;&nbsp;<span className="title">{e.qty}</span>
                      &nbsp;&nbsp;
                      <Button
                        className="shadow-none"
                        onClick={() => {
                          increment(e);
                        }}
                      >
                        +
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="danger"
                        className=""
                        onClick={() => handleDelete(i)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
              <div className="text-center description">
                <div>
                  <div>
                    Total Price&nbsp;:&nbsp;
                    <span className="title h6">
                      {cartPrice ? cartPrice : 0}
                    </span>
                  </div>
                  <Payment />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5 description">
                <div className="text-center ">
                  <h3 className="text-danger">Yor Cart is Emty</h3>
                  <Link to="/" className="btn btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
