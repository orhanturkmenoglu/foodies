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
        toast.error("❌ Failed to load food details.", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadFoodDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-warning" role="status">
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
        background: "linear-gradient(135deg, #fffaf0, #fefcf8)",
      }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div
          className="row gx-5 align-items-center shadow-lg rounded-5 bg-white p-4 p-lg-5"
          style={{
            transition: "all 0.3s ease",
            border: "1px solid #f1f1f1",
          }}
        >
          {/* Left Image */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <div className="position-relative overflow-hidden rounded-5 shadow-sm">
              <img
                className="img-fluid rounded-5"
                src={data?.imageUrl}
                alt={data?.name || "Food"}
                style={{
                  maxHeight: "440px",
                  objectFit: "cover",
                  width: "100%",
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

          {/* Right Content */}
          <div className="col-md-6">
            {/* Category Tag */}
            <div className="mb-3">
              <span
                className="px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center"
                style={{
                  background: "linear-gradient(135deg, #FFD54F, #FFB300)",
                  color: "#212529",
                  fontSize: "0.9rem",
                  letterSpacing: "0.5px",
                  boxShadow: "0 2px 8px rgba(255, 193, 7, 0.3)",
                }}
              >
                <i
                  className="bi bi-tag-fill me-2"
                  style={{ color: "#795548", fontSize: "1rem" }}
                ></i>
                <span>
                  Category:{" "}
                  <strong className="text-dark ms-1">{data?.category}</strong>
                </span>
              </span>
            </div>

            {/* Title */}
            <h1 className="display-6 fw-bold mb-3 text-dark">{data?.name}</h1>

            {/* Price */}
            <div className="fs-4 mb-4">
              <span className="text-muted text-decoration-line-through me-2">
                ${Math.floor(data?.price+10)}
              </span>
              <span
                className="fw-bold"
                style={{
                  color: "#28a745",
                  fontSize: "1.8rem",
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
              {data?.description}
            </p>

            {/* Actions */}
            <div className="d-flex align-items-center">
              <input
                className="form-control text-center me-3 rounded-pill border-secondary"
                id="inputQuantity"
                type="number"
                defaultValue={1}
                min={1}
                style={{ maxWidth: "4rem" }}
              />
              <button
                className="btn btn-lg rounded-pill px-4 shadow-sm text-white fw-semibold"
                type="button"
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
              >
                <i className="bi bi-cart-fill me-2"></i>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
