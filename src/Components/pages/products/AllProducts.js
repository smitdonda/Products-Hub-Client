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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching all products:", error);
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
            <div className="allproducts-div row">
              <h3 className="title">All Fashions</h3>
              <hr />
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
    </MainLayout>
  );
}

export default AllProducts;
