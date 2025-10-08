import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Menubar = () => {
  const [active, setActive] = useState("home");
  const { quantities, token, setToken,setQuantities } = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(
    (qty) => qty > 0
  ).length;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({})
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg shadow-sm custom-navbar">
      <div className="container">
        <Link to={"/"} className="navbar-brand d-flex align-items-center">
          <img
            src={assets.logo}
            height={48}
            width={48}
            className="logo me-2"
            alt="Logo"
          />
          <span className="brand-name">Foodies</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Sol Menü */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                to={"/"}
                className={
                  active === "home" ? "nav-link  fw-bold active" : "nav-link"
                }
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link fw-bold active" : "nav-link"
                }
                to={"/explore"}
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "contact-us"
                    ? "nav-link fw-bold active"
                    : "nav-link"
                }
                to={"/contact"}
                onClick={() => setActive("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Sağ Menü */}
          <div className="d-flex align-items-center gap-4">
            <Link to={"/cart"}>
              <div className="position-relative">
                <img
                  src={assets.cart}
                  alt="Cart"
                  height={36}
                  width={36}
                  className="cart-icon"
                />
                <span className="cart-badge badge rounded-pill">
                  {uniqueItemsInCart}
                </span>
              </div>
            </Link>
            {!token ? (
              <>
                <button
                  className="btn btn-primary px-3"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-success px-3"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href=""
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></a>
                <img
                  src={assets.profile}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-circle"
                />
                <ul className="dropdown-menu text-small ">
                  <li
                    className="dropdown-item cursor-pointer"
                    onClick={() => navigate("/myorders")}
                  >
                    Orders
                  </li>
                  <li className="dropdown-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
