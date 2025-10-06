import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFoodDetails } from "../../service/foodService";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

export const FoodDetails = () => {
  const { id } = useParams();
  const {increaseQty}=useContext(StoreContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch (error) {
        toast.error("❌ Failed to load food details.",error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadFoodDetails();
  }, [id]);


  const addToCart = ()=>{
    increaseQty(data.id)
    navigate("/cart");
  }
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger fw-semibold">⚠️ Food not found!</h4>
      </div>
    );
  }

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #fafaf9, #ffffff)",
      }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div
          className="row gx-5 align-items-center shadow-lg rounded-4 bg-white p-4 p-lg-5"
          style={{
            border: "1px solid #eee",
            transition: "all 0.3s ease",
          }}
        >
          {/* 🖼️ Left Image */}
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <div className="position-relative overflow-hidden rounded-4 shadow-sm">
              <img
                src={
                  data?.imageUrl ||
                  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                }
                alt={data?.name || "Food"}
                className="img-fluid rounded-4"
                style={{
                  width: "100%",
                  maxHeight: "440px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          </div>

          {/* 🧾 Right Content */}
          <div className="col-md-6">
            {/* Category Badge */}
            <div className="mb-3">
              <span
                className="px-3 py-2 rounded-pill text-dark fw-semibold shadow-sm small"
                style={{
                  background: "linear-gradient(135deg, #FFD54F, #FFB300)",
                  boxShadow: "0 2px 8px rgba(255, 193, 7, 0.3)",
                }}
              >
                <i className="bi bi-tag-fill me-2 text-secondary"></i>
                {data?.category || "General"}
              </span>
            </div>

            {/* Title */}
            <h2 className="fw-bold mb-3 text-dark">{data?.name}</h2>

            {/* Rating */}
            <div className="d-flex align-items-center mb-3 text-warning">
              {[...Array(4)].map((_, i) => (
                <i key={i} className="bi bi-star-fill me-1"></i>
              ))}
              <i className="bi bi-star-half me-2"></i>
              <span className="text-muted small">(4.5 / 5)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="fs-5 text-muted text-decoration-line-through me-2">
                ${Math.floor(data?.price + 10)}
              </span>
              <span
                className="fw-bold fs-3"
                style={{
                  color: "#28a745",
                  textShadow: "0 0 4px rgba(0,0,0,0.1)",
                }}
              >
                ${data?.price}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-secondary mb-4"
              style={{ lineHeight: "1.7", fontSize: "1.05rem" }}
            >
              {data?.description ||
                "A delightful meal prepared with fresh ingredients and bursting with flavor."}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center border rounded-pill px-2 py-1 shadow-sm">
                <button
                  className="btn btn-outline-secondary btn-sm rounded-circle"
                  style={{ width: 32, height: 32 }}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="form-control border-0 text-center fw-bold"
                  style={{
                    width: "3rem",
                    boxShadow: "none",
                  }}
                />
                <button
                  className="btn btn-success btn-sm rounded-circle"
                  style={{ width: 32, height: 32 }}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>

              <button
                className="btn btn-lg rounded-pill px-4 fw-semibold text-white shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #ff9900, #ff6600)",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(135deg, #ffb84d, #ff8000)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(135deg, #ff9900, #ff6600)")
                }
                onClick={addToCart}
              >
                <i className="bi bi-cart-plus me-2"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
