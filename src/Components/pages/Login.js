import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../../config/AxiosInstance";
import { setItem } from "../../config/cookieStorage";
import { SpinLoader } from "../containers/loaders";

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/login", values);

      if (res.data.success) {
        setItem("token", res.data.token);
        setItem("userInfo", res.data.userInfo);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logInFormik = useFormik({
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center vh-100">
      <form
        className="border border-success border-3 p-4 description"
        style={{ borderRadius: "2%", width: "29rem" }}
        onSubmit={logInFormik.handleSubmit}
      >
        <h4 className="mt-3 mb-5 text-center title">Log In </h4>
        <div className="form-group input-group m-0">
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
            onBlur={logInFormik.handleBlur}
            onChange={logInFormik.handleChange}
            value={logInFormik.values.email}
          />
        </div>
        {logInFormik.touched.email && logInFormik.errors.email ? (
          <div className="text-danger">{logInFormik.errors.email}</div>
        ) : null}
        <div className="input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <PasswordIcon />
            </span>
          </div>
          <input
            className="form-control border-right-0"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            onBlur={logInFormik.handleBlur}
            onChange={logInFormik.handleChange}
            value={logInFormik.values.password}
          />
          <span
            className="input-group-text bg-white border-left-0"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        {logInFormik.touched.password && logInFormik.errors.password ? (
          <div className="text-danger">{logInFormik.errors.password}</div>
        ) : null}

        <div className="form-group mt-4 d-grid">
          <Button type="submit" variant="success" className="shadow none">
            {isLoading ? <SpinLoader /> : "Login"}
          </Button>
        </div>
        <div className="text-center my-3">
          <Link to="/signup" className="text-dark text-decoration-none">
            <span className="text-muted">Have an account&nbsp;?&nbsp;</span>
            Signup
          </Link>
        </div>
        <h5>Demo Credentials </h5>
        <p>Email&nbsp;:&nbsp;user@gmail.com Password&nbsp;:&nbsp;User@123</p>
      </form>
    </div>
  );
}

export default Login;
