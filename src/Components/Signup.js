import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

function Signup() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post(
      "https://products-hub-server.herokuapp.com/users/signup",
      values
    );
    if (res.data.statusCode === 200) {
      navigate("/login");
    }
  };

  const signUp = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      cpassword: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div
      className="container d-flex flex-row justify-content-center align-items-center  "
      style={{ height: "100vh" }}
    >
      <form
        className="border border-success border-3 p-5 description"
        style={{ borderRadius: "2%", width: "450px" }}
        onSubmit={signUp.handleSubmit}
      >
        <div className="">
          <h4 className="text-center title">Sign Up</h4>
        </div>
        <div className="form-group input-group m-0">
          {/* username */}
          <div className="input-group-prepend">
            <span className="input-group-text">
              <PersonIcon />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="User Name"
            id="username"
            name="username"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            vlaue={signUp.values.username}
          />
        </div>
        {signUp.touched.username && signUp.errors.username ? (
          <div className="text-danger">{signUp.errors.username}</div>
        ) : null}
        {/* email */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <EmailIcon />
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Email address"
            type="email"
            id="email"
            name="email"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            vlaue={signUp.values.email}
          />
        </div>
        {signUp.touched.email && signUp.errors.email ? (
          <div className="text-danger">{signUp.errors.email}</div>
        ) : null}
        {/* password */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Create password"
            type="password"
            id="password"
            name="password"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            value={signUp.values.password}
          />
        </div>
        {signUp.touched.password && signUp.errors.password ? (
          <div className="text-danger">{signUp.errors.password}</div>
        ) : null}
        {/* cpassword */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Repeat password"
            type="password"
            id="cpassword"
            name="cpassword"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            value={signUp.values.cpassword}
          />
        </div>
        {signUp.touched.cpassword && signUp.errors.cpassword ? (
          <div className="text-danger">{signUp.errors.cpassword}</div>
        ) : null}
        <div className="form-group mt-3">
          <Button type="submit" variant="success" className="btn btn-block ">
            Create Account
          </Button>
        </div>
        <hr className="mt-4" />
        <div className="text-center">
          Have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            className="text-dark shadow-none"
            style={{ backgroundColor: "#ffff", border: "none" }}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
