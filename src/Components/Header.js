import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductHub } from "../App";

function Header() {
  let context = useContext(ProductHub);
  let navigate = useNavigate();
  // logOut

  var token = sessionStorage.getItem("token");
  let logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar fixed="top" expand="md" className="bg-success">
      <Navbar.Brand>
        <Link to="/" className="text-white text-wrap text-decoration-none">
          <h3 className="title">Product Hub</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="bg-white"
        style={{ fontSize: "20px" }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Link to="/allproducts" className="text-white ml-2 description">
          All Fashions
        </Link>
        <Nav className="ml-auto text-white">
          <Nav.Item onClick={() => navigate("/cart")}>
            <Nav.Link className="text-white">
              <ShoppingCartIcon />
                             {context.cartValue > 0 ? (
                  <>
                    <sup className="badge badge-danger rounded-circle badge-pill ">
                      {context.cartValue}
                    </sup>
                  </>
                ) : null}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {token ? (
              <>
                <Nav.Link
                  className="description text-white"
                  variant="success"
                  size="sm"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout&nbsp;
                  <LogoutIcon />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  to="/login"
                  className="text-white description "
                  size="sm"
                >
                  <LoginIcon />
                  &nbsp;Login
                </Nav.Link>
              </>
            )}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/signup"
              className="text-white description"
              style={{ fontSize: "medium" }}
            >
              SignUp
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
