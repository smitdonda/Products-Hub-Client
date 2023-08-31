import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Spin() {
  return (
    <>
      <i class="fa fa-spinner fa-spin"></i>
    </>
  );
}

function SpinLoader() {
  return (
    <>
      <i class="fa fa-spinner fa-spin"></i> Loading...
    </>
  );
}

function Loader({ isLoading }) {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-center"
      style={{ height: "80.14vh" }}
    >
      <HashLoader
        color="#14A44D"
        loading={isLoading}
        size={"58px"}
        speedMultiplier={1}
      />
    </div>
  );
}

export { Spin, SpinLoader, Loader };
