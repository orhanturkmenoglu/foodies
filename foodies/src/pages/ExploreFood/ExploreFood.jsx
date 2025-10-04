import React, { useState } from "react";
import { FoodDisplay } from "../../components/FoodDisplay/FoodDisplay";

export const ExploreFood = () => {
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <section
        className="py-5"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="container">
          {/* Başlık */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-2">Explore Foods</h2>
            <p className="text-secondary">
              Filter by category or search to find your favorite dishes
            </p>
          </div>

          {/* Arama Alanı */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <form
                className="bg-white shadow-sm rounded-4 p-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="d-flex gap-2">
                  {/* Category Select */}
                  <select
                    className="form-select border-0 rounded-3 text-dark fw-semibold"
                    style={{
                      backgroundColor: "#f1f1f1",
                      maxWidth: "150px",
                    }}
                    onChange={(e)=>setCategory(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Burger">Burger</option>
                    <option value="Cake">Cake</option>
                    <option value="Ice Creams">Ice Cream</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Salad">Salad</option>
                  </select>

                  {/* Search Input */}
                  <input
                    type="text"
                    className="form-control border-0 bg-light rounded-3"
                    placeholder="Search food..."
                    style={{
                      fontSize: "0.95rem",
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                  />

                  {/* Button */}
                  <button
                    className="btn rounded-3 fw-semibold px-4"
                    type="submit"
                    style={{
                      backgroundColor: "#212529",
                      color: "#fff",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ff7b00")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#212529")
                    }
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Yemek Kartları */}
      <div className="mt-4">
        <FoodDisplay category={category} searchText= {searchText} />
      </div>
    </>
  );
};
