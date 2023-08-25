import React, { useContext } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductHub } from "../../App";
import { getItem, removeItem } from "../../config/cookieStorage";

function Header() {
  let context = useContext(ProductHub);
  const navigate = useNavigate();

  // logOut
  const token = getItem("token");
  const logOut = () => {
    removeItem("token");
    removeItem("username");
    navigate("/login");
  };

  return (
    <Navbar fixed="top" expand="sm" className="bg-success px-4">
      <Navbar.Brand className="d-flex align-items-center gap-3">
        <Navbar.Toggle aria-controls="basic-navbar-nav">&#9776;</Navbar.Toggle>
        <Link to="/" className="text-white text-wrap text-decoration-none">
          <h3 className="title">Product Hub</h3>
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Link to="/allproducts" className="text-white ml-2 description">
          All Fashions
        </Link>
        <Nav className="text-white ml-auto gap-2">
          <Nav.Item>
            <Link to="/cart" className="text-white px-2">
              <ShoppingCartIcon />
              {context.cartValue > 0 ? (
                <>
                  <span className="badge badge-danger rounded-circle badge-pill">
                    {context.cartValue}
                  </span>
                </>
              ) : null}
            </Link>
          </Nav.Item>
          <Nav.Item>
            {token ? (
              <>
                <Button
                  className="description"
                  variant="success"
                  size="sm"
                  onClick={() => logOut()}
                >
                  Logout&nbsp;
                  <LogoutIcon />
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white mr-2 text-decoration-none description "
                >
                  <LoginIcon />
                  &nbsp;Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-decoration-none description"
                >
                  SignUp
                </Link>
              </>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
