import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const FoodItem = ({ name, description, id, price, imageUrl }) => {
  const { increaseQty, decreaseQty, quantities } = useContext(StoreContext);

  
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div
        className="card shadow-sm border-0 rounded-4 overflow-hidden hover-shadow transition-all"
        style={{
          maxWidth: 320,
          backgroundColor: "#fff",
          transition: "all 0.3s ease",
        }}
      >
        <Link to={`/food/${id}`} className="text-decoration-none">
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            }
            className="card-img-top"
            alt={name || "Product Image"}
            style={{
              height: 200,
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>

        <div className="card-body p-3">
          <h5 className="card-title fw-semibold text-dark mb-2">
            {name || "Delicious Meal"}
          </h5>
          <p className="card-text text-muted small mb-3">
            {description || "Short product description goes here."}
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5 text-primary">${price || 99.99}</span>
            <div className="d-flex align-items-center text-warning small">
              {[...Array(4)].map((_, i) => (
                <i key={i} className="bi bi-star-fill"></i>
              ))}
              <i className="bi bi-star-half"></i>
              <span className="text-muted ms-1">(4.5)</span>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3 px-3">
          <Link
            className="btn btn-outline-primary btn-sm px-3 rounded-pill fw-semibold"
            to={`/food/${id}`}
          >
            View Details
          </Link>

          {quantities[id] > 0 ? (
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-danger btn-sm rounded-circle"
                style={{ width: 32, height: 32 }}
                onClick={() => decreaseQty(id)}
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <span className="fw-bold text-dark">{quantities[id]}</span>
              <button
                className="btn btn-success btn-sm rounded-circle"
                style={{ width: 32, height: 32 }}
                onClick={() => increaseQty(id)}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-success btn-sm px-3 rounded-pill fw-semibold"
              onClick={() => increaseQty(id)}
            >
              <i className="bi bi-cart-plus me-1"></i> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
