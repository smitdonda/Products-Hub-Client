import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
function ProductCategory() {
  //   seleted category all products // get method  (find the category Name)
  let { id } = useParams();

  let [seletedCategory, setSeletedCategory] = useState();
  let [categoryname, setCategoryName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let url =
    "https://products-hub-server.vercel.app/users/getProductByCategory/" + id;
  let allProductsData = async () => {
    let res = await axios.get(url);
    if (res) {
      setSeletedCategory(res.data.allProducts);
      setCategoryName(res?.data?.allProducts[0]?.categoryName);
      setIsLoading(false);
    }
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
          <div style={{ marginTop: "100px" }} className="container-fluid">
            <h3 className="text-uppercase mt-4 title">{categoryname}</h3>
            <hr />
            <div className="mt-2 mb-5 allproducts-div row description">
              {seletedCategory?.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="text-center p-4 col"
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
    </>
  );
}

export default ProductCategory;
