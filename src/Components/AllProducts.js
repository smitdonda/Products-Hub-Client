import React, {  useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";

function AllProducts() {
  const [isLoading, setIsLoading] = useState(true);
  let [allProducts, setAllProducts] = useState();
  let allProductsData = async () => {
    let res = await axios.get(
      "https://products-hub-server.herokuapp.com/users/getallfeshionproduct"
    );
    setIsLoading(false);
    setAllProducts(res.data.allProducts);
  };
  useEffect(() => {
    allProductsData();
  }, []);

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
          <div className="container-fluid" style={{ marginTop: "100px" }}>
            <div className="mt-2 mb-5 allproducts-div row">
              <h3 className="title">All Fashions</h3>
              <hr className="border-bottom border-5" />
              {allProducts?.map((e, i) => {
                return (
                  <>
                    <div
                      className="text-center col p-4 mt-3 mb-3 description"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <Link
                        to={`/productdetails/` + e._id}
                        className="text-decoration-none text-dark"
                      >
                        <img
                          src={e.images[0]}
                          className="products-images"
                          alt="name"
                          width="300px"
                        />
                        <div className="pt-3">
                          <h6 className="category">{e.name}</h6>
                        </div>
                        <p className="text-center title">
                          &#8377;&nbsp;{e.price}
                        </p>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllProducts;
