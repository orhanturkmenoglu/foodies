import React, { useState } from "react";
import { FoodDisplay } from "../../components/FoodDisplay/FoodDisplay";

export const ExploreFood = () => {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const categories = ["All", "Biryani", "Burger", "Cake", "Ice cream", "Pizza", "Rolls", "Salad"];

  return (
    <>
      <section className="py-5" style={{ backgroundColor: "#fefefe" }}>
        <div className="container">
          {/* Başlık */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-3">
              Explore Delicious Foods
            </h1>
            <p className="lead text-muted">
              Choose a category or search to find your favorite dishes
            </p>
          </div>

          {/* Kategori Butonları */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm fw-semibold ${
                  category === cat ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => setCategory(cat)}
                style={{ borderRadius: "50px", minWidth: "100px" }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Arama Alanı */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="input-group shadow-sm rounded-pill overflow-hidden">
                <input
                  type="text"
                  className="form-control border-0 px-4"
                  placeholder="Search food..."
                  style={{ height: "50px", fontSize: "1rem" }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    borderRadius: 0,
                    background: "linear-gradient(90deg, #ff7b00, #ffb347)",
                    border: "none",
                  }}
                >
                  <i className="bi bi-search text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yemek Kartları */}
      <div className="mt-5">
        <FoodDisplay category={category} searchText={searchText} />
      </div>
    </>
  );
};
