import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFoodDetails } from "../../service/foodService";
import { toast } from "react-toastify";

export const FoodDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch (error) {
        toast.error("❌ Failed to load food details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadFoodDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">⚠️ Food not found!</h4>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-5 align-items-center shadow-lg rounded-4 bg-white p-4">
          {/* Left Image */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              className="img-fluid rounded-4 shadow-lg"
              src={data?.imageUrl}
              alt={data?.name || "Food"}
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>

          {/* Right Content */}
          <div className="col-md-6">
            {/* Category Tag */}
            <div className="mb-3">
              <span
                className="px-3 py-2 rounded-pill shadow-sm fw-semibold"
                style={{
                  background: "linear-gradient(135deg, #ffcc00, #ff9900)",
                  color: "#212529",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px"
                }}
              >
                <i className="bi bi-tag me-2"></i>
                {data?.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="display-6 fw-bold mb-3 text-dark">
              {data?.name}
            </h1>

            {/* Price */}
            <div className="fs-4 mb-4">
              <span className="text-muted text-decoration-line-through me-2">
                ${data?.price + 10}
              </span>
              <span className="fw-bold text-success">${data?.price}</span>
            </div>

            {/* Description */}
            <p className="lead text-secondary mb-4">{data?.description}</p>

            {/* Actions */}
            <div className="d-flex align-items-center">
              <input
                className="form-control text-center me-3 rounded-pill border-dark"
                id="inputQuantity"
                type="number"
                defaultValue={1}
                style={{ maxWidth: "4rem" }}
              />
              <button
                className="btn btn-dark btn-lg rounded-pill px-4 shadow-sm"
                type="button"
                style={{
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ff9900")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#212529")
                }
              >
                <i className="bi bi-cart-fill me-2"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
