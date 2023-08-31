import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MainLayout from "../../containers/MainLayout";
import axiosInstance from "../../../config/AxiosInstance";
import { Loader } from "../../containers/loaders";

function ProductCategory() {
  //   seleted category all products
  const { id } = useParams();
  const [seletedCategory, setSeletedCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get method  (find the category Name)
  const getProductByCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/products/getProductByCategory/${id}`
      );
      if (response.data) {
        setSeletedCategory(response.data.products);
        setCategoryName(response?.data?.products[0]?.categoryName);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductByCategory();
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
            <h3 className="text-uppercase mt-4 title">{categoryName}</h3>
            <hr />
            <div className="mt-2 mb-5 allproducts-div description">
              {seletedCategory?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="text-center p-4 product-card"
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
                );
              })}
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default ProductCategory;
