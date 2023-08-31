import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/AxiosInstance";
import { SpinLoader } from "../containers/loaders";

function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/signup", values);
      if (res.data.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(
        "Signup failed:",
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signUpFormik = useFormik({
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      <form
        className="border border-success border-3 p-5 description"
        style={{ borderRadius: "2%", width: "29rem" }}
        onSubmit={signUpFormik.handleSubmit}
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
            onBlur={signUpFormik.handleBlur}
            onChange={signUpFormik.handleChange}
            vlaue={signUpFormik.values.username}
          />
        </div>
        {signUpFormik.touched.username && signUpFormik.errors.username ? (
          <div className="text-danger">{signUpFormik.errors.username}</div>
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
            name="email"
            onBlur={signUpFormik.handleBlur}
            onChange={signUpFormik.handleChange}
            vlaue={signUpFormik.values.email}
          />
        </div>
        {signUpFormik.touched.email && signUpFormik.errors.email ? (
          <div className="text-danger">{signUpFormik.errors.email}</div>
        ) : null}
        {/* password */}
        <div className="form-group input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <KeyIcon />
            </span>
          </div>
          <input
            className="form-control border-right-0"
            placeholder="Create password"
            type={showPassword ? "text" : "password"}
            name="password"
            onBlur={signUpFormik.handleBlur}
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.password}
          />
          <span
            className="input-group-text bg-white border-left-0"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        {signUpFormik.touched.password && signUpFormik.errors.password ? (
          <div className="text-danger">{signUpFormik.errors.password}</div>
        ) : null}
        {/* cpassword */}
        <div className="form-group input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control border-right-0"
            placeholder="Repeat password"
            type={showPassword ? "text" : "password"}
            name="cpassword"
            onBlur={signUpFormik.handleBlur}
            onChange={signUpFormik.handleChange}
            value={signUpFormik.values.cpassword}
          />
          <span
            className="input-group-text bg-white border-left-0"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        {signUpFormik.touched.cpassword && signUpFormik.errors.cpassword ? (
          <div className="text-danger">{signUpFormik.errors.cpassword}</div>
        ) : null}
        <div className="form-group mt-4 d-grid">
          <Button type="submit" variant="success" className="shadow-none">
            {isLoading ? <SpinLoader /> : "Create Account"}
          </Button>
        </div>
        <hr className="mt-4" />
        <div className="text-center my-3">
          <Link to="/login" className="text-dark text-decoration-none">
            <span className="text-muted">Have an account&nbsp;?&nbsp;</span>
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
