import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Home() {
  let navigate = useNavigate();
  // auth post method  and chacked token or not
  let chackAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let config = {
        headers: {
          token: token,
        },
      };

      // auth post method
      let res = await axios.post(
        "https://products-hub-server.herokuapp.com/users/auth",
        { purpose: "validate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        sessionStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    chackAuth();
  }, []);

  let [onlyCategory, setOnlyCategory] = useState();
  let categoryData = async () => {
    let res = await axios.get(
      "https://products-hub-server.herokuapp.com/users/getcategory"
    );
    setOnlyCategory(res.data.category);
    setIsLoading(false);
  };

  let productsData = () => {};

  useEffect(() => {
    categoryData();
    productsData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

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
            <div className="container-fluid">
              <div className="main-images">
                <img
                  src="https://cdn.shopify.com/s/files/1/0070/1922/collections/category_mens_shirting_01_2048x2048.progressive.jpg"
                  alt="images"
                  width="100%"
                />
                <h4 className="some-text description">Man's Feshions Hub</h4>
              </div>
              <div className="mt-2 mb-5 d-flex flex-row justify-content-center align-items-center row  ">
                <div className="Shirts-img mt-3 d-flex flex-row justify-content-center align-items-center col">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0070/1922/files/ts_homepageblock_Q222_SS_Woven_Shirts-desktop_1442x.progressive.jpg?v=4177309093432126004"
                    alt=""
                    width="100%"
                  />
                  <div className="shirts-text description ">
                    <h6>Top Brand</h6>
                    <button
                      onClick={() => navigate("/allproducts")}
                      className="btn btn-outline-light"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
                <div className="Shirts-img mt-3 col d-flex flex-row justify-content-center align-items-center">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0070/1922/files/ts_homepageblock_Q222_shorts-desktop_copy_1442x.progressive.jpg?v=2617876536191488155"
                    alt=""
                    width="100%"
                  />
                  <div className="shirts-text description">
                    <h6>Top Brand</h6>
                    <button className="btn btn-outline-light">Shop Now</button>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-5 category-div row">
                {/* category */}
                {onlyCategory?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="text-center p-3  col"
                      style={{ backgroundColor: "#f2f2f2", width: "400px" }}
                    >
                      <Link
                        to={
                          `/categoryproduct/` +
                          e.name.replace(/ /g, "").toLowerCase()
                        }
                        className="text-decoration-none"
                      >
                        <div className="p-4">
                          <h6 className="text-left border-bottom border-danger border-bottom-2 pb-1 text-capitalize text-danger title category">
                            {e.name}
                          </h6>
                        </div>
                        <img
                          src={e.image}
                          className="category-images"
                          alt={e.name}
                          width="350px"
                        />
                        <p className="text-center p-3 text-dark description">
                          {e.text}
                        </p>
                        <div className="pr-3">
                          <p className="float-right shopNow description">
                            Shop Now
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
