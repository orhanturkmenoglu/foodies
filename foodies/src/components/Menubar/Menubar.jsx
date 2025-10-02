import React from 'react';
import "./Menubar.css";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

export const Menubar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm custom-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={assets.logo} height={48} width={48} className="logo me-2" alt="Logo" />
          <span className="brand-name">Foodies</span>
        </a>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Sol Menü */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link to={"/"} className="nav-link active" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/explore"}>Explore</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/contact"}>Contact Us</Link>
            </li>
          </ul>

          {/* Sağ Menü */}
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <img src={assets.cart} alt="Cart" height={36} width={36} className="cart-icon"/>
              <span className="cart-badge badge rounded-pill">5</span>
            </div>
            <button className="btn btn-primary px-3">Login</button>
            <button className="btn btn-success px-3">Register</button>
          </div>
        </div>
      </div>
    </nav>
  )
}
