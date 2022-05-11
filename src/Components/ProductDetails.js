import React, { useEffect, useState, useContext } from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductHub } from "../App";
import Header from "./Header";

function ProductDetails() {
  let context = useContext(ProductHub);
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  let [seletSize, setseletSize] = useState();
  // selected product details // get method (find the Products Id )
  let [product, setProducts] = useState();
  let productsData = async () => {
    let res = await axios.get(
      "https://products-hub-server.herokuapp.com/users/getProductById/" + id
    );
    setProducts(res.data.products);
    setIsLoading(false);
  };
  useEffect(() => {
    productsData();
  }, []);

  let addCartData = (products) => {
    console.log(products.size);
    if (seletSize) {
      let print = context.cart.findIndex((c) => c.name === products.name);
      if (print === -1) {
        if (seletSize) {
          products["selectedsize"] = seletSize;
        }
        products["qty"] = 1;
        context.cart.push(products);
        context.setCartValue(context.cart.length);
      } else {
        context.cart[print]["qty"] += 1;
      }
    } else {
      if (products.size) {
        alert("Please select size");
      } else {
        let print = context.cart.findIndex((c) => c.name === products.name);
        if (print === -1) {
          if (seletSize) {
            products["selectedsize"] = seletSize;
          }
          products["qty"] = 1;
          context.cart.push(products);
          context.setCartValue(context.cart.length);
        } else {
          context.cart[print]["qty"] += 1;
        }
      }
    }
  };

  return (
    <>
      <Header></Header>
      {isLoading ? (
        <>
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: "100px" }}>
            {product?.map((e, i) => {
              return (
                <div key={i}>
                  <div className="container-fluid">
                    <div className="row products-details-div  d-flex flex-row justify-content-center align-items-center">
                      <div className="col">
                        <Carousel fade className="text-center">
                          {e?.images?.map((img, b) => {
                            return (
                              <Carousel.Item key={b}>
                                <img
                                  className="carousel-images text-center"
                                  src={img}
                                  alt={e.name}
                                  style={{ maxWidth: "800px" }}
                                />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                      </div>
                      <div className="col d-flex flex-row justify-content-center align-items-center">
                        <div>
                          <h3 className="p-4 title text-center">{e.name}</h3>
                          <p
                            className="title text-center"
                            style={{ fontSize: "30px" }}
                          >
                            &#8377;&nbsp;{e.price}
                          </p>
                          <div className="d-flex flex-row justify-content-center align-items-center">
                            <div>
                              {e.size ? (
                                <>
                                  <div>
                                    <p className="title">Size</p>
                                  </div>
                                </>
                              ) : null}
                              {e?.size?.map((size, b) => {
                                return (
                                  <div className="py">
                                    <label>
                                      <input
                                        type="radio"
                                        className="option-input radio"
                                        name="example"
                                        value={size}
                                        onClick={() => setseletSize(size)}
                                      />
                                      &nbsp;&nbsp;
                                      {size}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="text-center">
                            <Button
                              className="shadow-none mt-4 card-btn"
                              style={{ borderRadius: "50px" }}
                              onClick={() => {
                                addCartData(e);
                              }}
                            >
                              Add to Bag
                            </Button>
                          </div>
                          {/*  */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <div className="p-4">
                          <h6 className="text-uppercase title mb-4">
                            Description
                          </h6>
                          <p className="description">{e.description}</p>
                        </div>
                        <div className="p-4">
                          <h6 className="text-uppercase title mb-4">
                            Material
                          </h6>
                          <p className="description">{e.material}</p>
                        </div>
                      </div>
                      <div className="col p-4">
                        <div>
                          <h6 className="text-uppercase title ml-3 mb-4">
                            Spacifications
                          </h6>
                          {e?.specifications?.map((s, c) => {
                            return (
                              <ul key={c} className="description">
                                <li>{s}</li>
                              </ul>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
