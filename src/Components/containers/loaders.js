import React from "react";
import { Spinner } from "react-bootstrap";
import HashLoader from "react-spinners/HashLoader";

function Spin() {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </>
  );
}

function SpinLoader() {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />{" "}
      Loading...
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
        size={60}
        speedMultiplier={1}
      />
    </div>
  );
}

export { Spin, SpinLoader, Loader };
