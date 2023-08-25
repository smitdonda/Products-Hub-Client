import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import axiosInstance from "../../config/AxiosInstance";
import { setItem } from "../../config/cookieStorage";
import { SpinLoader } from "../containers/loaders";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/login", values);

      if (res.data.success) {
        setItem("token", res.data.token);
        setItem("username", res.data.username);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
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
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      <form
        className="border border-success border-3 p-4 description"
        style={{ borderRadius: "2%", width: "28rem" }}
        onSubmit={login.handleSubmit}
      >
        <h4 className="mt-3 mb-5 text-center title">Log In </h4>
        <div className="form-group input-group  m-0">
          <div className="input-group-prepend ">
            <span className="input-group-text">
              <EmailIcon />
            </span>
          </div>
          <input
            className="form-control "
            placeholder="Email address"
            type="email"
            name="email"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.email}
          />
        </div>
        {login.touched.email && login.errors.email ? (
          <div className="text-danger">{login.errors.email}</div>
        ) : null}
        <div className="form-group input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <PasswordIcon />
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Password"
            type="password"
            name="password"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.password}
          />
        </div>
        {login.touched.password && login.errors.password ? (
          <div className="text-danger">{login.errors.password}</div>
        ) : null}

        <div className="form-group mt-4 d-grid">
          <Button type="submit" variant="success" className="shadow-none">
            {isLoading ? <SpinLoader /> : "Login"}
          </Button>
        </div>
        <p className="text-center">
          <Button
            onClick={() => navigate("/signup")}
            className="text-dark shadow-none"
            style={{ backgroundColor: "#ffff", border: "none" }}
          >
            <span className="text-muted">Have an account&nbsp;?&nbsp;</span>
            Signup
          </Button>
        </p>
        <h4>Demo Credentials </h4>
        <p>Email&nbsp;:&nbsp;user@gmail.com Password&nbsp;:&nbsp;User@123</p>
      </form>
    </div>
  );
}

export default Login;
