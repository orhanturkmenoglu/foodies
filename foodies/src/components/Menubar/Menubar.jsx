import React, { useContext, useState } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const Menubar = () => {
  const [active, setActive] = useState("home");
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm custom-navbar p-3">
      <div className="container d-flex align-items-center justify-content-between gap-3">
        {/* Logo & Brand */}
        <Link
          to="/"
          className="d-flex align-items-center text-decoration-none brand-hover"
        >
          <img
            src={assets.logo}
            height={48}
            width={48}
            alt="Logo"
            className="me-2 rounded-circle shadow-sm"
          />
          <span className="fw-bold fs-4 text-dark">Foodies</span>
        </Link>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu & Right Buttons */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            {[
              { name: "Home", key: "home", path: "/" },
              { name: "Explore", key: "explore", path: "/explore" },
              { name: "Contact Us", key: "contact-us", path: "/contact" },
            ].map(item => (
              <li key={item.key} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link px-3 py-1 fw-semibold rounded ${
                    active === item.key ? "active-link" : "text-dark nav-hover"
                  }`}
                  onClick={() => {
                    setActive(item.key);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="position-relative cart-hover">
              <img
                src={assets.cart}
                alt="Cart"
                height={36}
                width={36}
                className="cart-icon rounded-circle shadow-sm p-1"
              />
              {uniqueItemsInCart > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm">
                  {uniqueItemsInCart}
                </span>
              )}
            </Link>

            {/* Auth Buttons / Profile Dropdown */}
            {!token ? (
              <>
                <button
                  className="btn btn-outline-primary fw-semibold px-4"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary fw-semibold px-4"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown">
                <img
                  src={assets.profile}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-circle cursor-pointer shadow-sm profile-hover"
                  onClick={(e) => e.currentTarget.nextSibling.classList.toggle("show")}
                  style={{ border: "2px solid #0d6efd", transition: "all 0.2s ease" }}
                />
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm rounded-3 p-2"
                  style={{ minWidth: "150px", transition: "all 0.3s ease" }}
                >
                  <li
                    className="dropdown-item d-flex align-items-center gap-2 cursor-pointer hover-bg"
                    onClick={() => navigate("/myorders")}
                    style={{ padding: "8px 12px" }}
                  >
                    <i className="bi bi-box me-2"></i> Orders
                  </li>
                  <li
                    className="dropdown-item d-flex align-items-center gap-2 text-danger cursor-pointer hover-bg"
                    onClick={logout}
                    style={{ padding: "8px 12px" }}
                  >
                    <i className="bi bi-door-closed me-2"></i> Logout
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
