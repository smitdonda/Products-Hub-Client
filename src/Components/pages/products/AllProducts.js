import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../containers/MainLayout";
import axiosInstance from "../../../config/AxiosInstance";
import { Loader } from "../../containers/loaders";

function AllProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setAllProducts(response.data.products);
      console.log(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching all products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <>
          <Loader isLoading={isLoading} />
        </>
      ) : (
        <>
          <div>
            <h3 className="title">All Fashions</h3>
            <hr />
            <div className="allproducts-div mb-5">
              {allProducts?.map((e, i) => {
                return (
                  <>
                    <div
                      className="text-center p-4 description product-card"
                      style={{ backgroundColor: "#f2f2f2" }}
                    >
                      <Link
                        to={`/productdetails/` + e._id}
                        className="text-decoration-none text-dark"
                      >
                        <div style={{ height: "290px" }}>
                          <img
                            src={e?.images[0] || e?.images[4]}
                            className="products-images"
                            alt="name"
                            width="300px"
                          />
                        </div>
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
    </MainLayout>
  );
}

export default AllProducts;
