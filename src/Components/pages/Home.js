import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../containers/MainLayout";
import axiosInstance from "../../config/AxiosInstance";
import { Loader } from "../containers/loaders";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [onlyCategory, setOnlyCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setOnlyCategory(response.data.category);
    } catch (error) {
      console.log("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
            <div className="my-3 main-images">
              <img
                src="https://cdn.shopify.com/s/files/1/0070/1922/collections/category_mens_shirting_01_2048x2048.progressive.jpg"
                alt="images"
                width="100%"
              />
              <p className="some-text description">Man's Feshions Hub</p>
            </div>
            <div className="my-3 d-flex flex-row justify-content-center align-items-center row">
              <div className="Shirts-img mt-3 d-flex flex-row justify-content-center align-items-center col">
                <img
                  src="https://cdn.shopify.com/s/files/1/0070/1922/files/ts_homepageblock_Q222_SS_Woven_Shirts-desktop_1442x.progressive.jpg?v=4177309093432126004"
                  alt=""
                  width="100%"
                />
                <div className="shirts-text description ">
                  <p>Top Brand</p>
                  <Button
                    onClick={() => navigate("/allproducts")}
                    variant="outline-light"
                  >
                    Shop Now
                  </Button>
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
                  <Button
                    onClick={() => navigate("/categoryproduct/bottoms")}
                    variant="outline-light"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
            <div className="my-5 category-div">
              {/* category */}
              {onlyCategory?.map((e, i) => {
                return (
                  <div key={i} className="text-center p-3 category-card">
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
        </>
      )}
    </MainLayout>
  );
}

export default Home;
