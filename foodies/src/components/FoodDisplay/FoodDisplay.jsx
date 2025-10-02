import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

export const FoodDisplay = () => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className="container my-4">
      <div className="row">
        {foodList && foodList.length > 0 ? (
          foodList.map((item, index) => (
            <div 
              key={index} 
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div className="card shadow-sm" style={{ maxWidth: 320, borderRadius: "12px" }}>
                <img
                  src={item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
                  className="card-img-top rounded-top"
                  alt={item.name || "Product Image"}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name || "Red Nike"}</h5>
                  <p className="card-text text-truncate">
                    {item.description || "Short product description goes here."}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h6 mb-0">${item.price || 99.99}</span>
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
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4 w-100">
            <h4>No food found</h4>
          </div>
        )}
      </div>
    </div>
  );
};
