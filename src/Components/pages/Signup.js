import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/AxiosInstance";
import { SpinLoader } from "../containers/loaders";

function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/signup", values);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
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
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      <form
        className="border border-success border-3 p-5 description"
        style={{ borderRadius: "2%", width: "28rem" }}
        onSubmit={signUp.handleSubmit}
      >
        <div className="mb-4">
          <h4 className="text-center title">Sign Up</h4>
        </div>
        <div className="form-group input-group">
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
        <div className="form-group input-group m-0 mt-4">
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
        <div className="form-group input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <KeyIcon />
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
        <div className="form-group input-group m-0 mt-4">
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
        <div className="form-group mt-4 d-grid">
          <Button type="submit" variant="success" className="shadow-none">
            {isLoading ? <SpinLoader /> : "Create Account"}
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
