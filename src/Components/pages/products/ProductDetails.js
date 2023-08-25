import React, { useEffect, useState, useContext } from "react";
import { Carousel, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../config/AxiosInstance";
import MainLayout from "../../containers/MainLayout";
import { ProductHub } from "../../../App";
import { Loader } from "../../containers/loaders";

function ProductDetails() {
  const context = useContext(ProductHub);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [seletSize, setseletSize] = useState("");

  // selected product details // get method (find the Products Id )
  const [product, setProduct] = useState({});
  const getProductById = async () => {
    try {
      const response = await axiosInstance.get(
        `/products/getProductById/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  const addCartData = (products) => {
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
        toast.error("Please select size");
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
    <MainLayout>
      {isLoading ? (
        <>
          <Loader isLoading={isLoading} />
        </>
      ) : (
        <>
          <div>
            <div>
              <div>
                <div className="row products-details-div  d-flex flex-row justify-content-center align-items-center">
                  <div className="col">
                    <Carousel fade className="text-center">
                      {product?.images?.map((img, b) => {
                        return (
                          <Carousel.Item key={b}>
                            <img
                              className="carousel-images text-center"
                              src={img}
                              alt={product.name}
                              style={{ maxWidth: "800px" }}
                            />
                          </Carousel.Item>
                        );
                      })}
                    </Carousel>
                  </div>
                  <div className="col d-flex flex-row justify-content-center align-items-center">
                    <div>
                      <h3 className="p-4 title text-center">{product.name}</h3>
                      <p
                        className="title text-center"
                        style={{ fontSize: "30px" }}
                      >
                        &#8377;&nbsp;{product.price}
                      </p>
                      <div className="d-flex flex-row justify-content-center align-items-center">
                        <div>
                          {product.size ? (
                            <>
                              <div>
                                <p className="title">Size</p>
                              </div>
                            </>
                          ) : null}
                          {product?.size?.map((size, b) => {
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
                          onClick={() => addCartData(product)}
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
                      <h6 className="text-uppercase title mb-4">Description</h6>
                      <p className="description">{product.description}</p>
                    </div>
                    <div className="p-4">
                      <h6 className="text-uppercase title mb-4">Material</h6>
                      <p className="description">{product.material}</p>
                    </div>
                  </div>
                  <div className="col p-4">
                    <div>
                      <h6 className="text-uppercase title ml-3 mb-4">
                        Spacifications
                      </h6>
                      {product?.specifications?.map((s, c) => {
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
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default ProductDetails;
