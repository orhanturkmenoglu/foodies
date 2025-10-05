import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export const FoodItem = ({ name, description, id, price, imageUrl }) => {
  const { increaseQty, decreaseQty,quantities } = useContext(StoreContext);
  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
      style={{ textDecoration: "none" }}
    >
      <div
        className="card shadow-sm"
        style={{ maxWidth: 320, borderRadius: "12px" }}
      >
        <Link to={`/food/${id}`}>
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            }
            className="card-img-top rounded-top"
            alt={name || "Product Image"}
            style={{ height: 200, objectFit: "cover" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name || "Red Nike"}</h5>
          <p className="card-text text-truncate">
            {description || "Short product description goes here."}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h6 mb-0">${price || 99.99}</span>
            <div className="d-flex align-items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <i key={i} className="bi bi-star-fill text-warning"></i>
              ))}
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border-0 pt-2">
          <Link className="btn btn-primary btn-sm" to={`/food/${id}`}>
            View Food
          </Link>
           {quantities[id]>0 ? (
            <div>
              <button className="btn btn-outline-primary btn-sm" onClick={()=>decreaseQty(id)}>
         <i className="bi bi-plus-circle"></i>
             </button>
             <span className="fw-bold"> {quantities [id]}</span>
             <button className="btn btn-success btn-sm" onClick={()=>increaseQty(id)}>
              <i className="bi bi-plus-circle"></i>
             </button>
            </div>
           ):(
            <button className="btn btn-success btn-sm" onClick={()=>increaseQty(id)}>
              <i className="bi bi-plus-circle"></i>
             </button>
           ) }
        </div>
      </div>
    </div>
  );
};
