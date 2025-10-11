import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../services/foodService";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Biryani",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    try {
      await addFood(data, image);
      toast.success("Food added successfully");
      setData({ name: "", description: "", category: "Biryani", price: "" });
      setImage(null);
    } catch (error) {
      toast.error("Error adding food. Connection failed.");
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-4 overflow-hidden">
            <div
              className="card-header text-center py-4"
              style={{
                background: "linear-gradient(90deg, #ff7b00, #ffb347)",
                color: "#fff",
              }}
            >
              <h3 className="fw-bold mb-0">🍴 Add New Food</h3>
              <small>Fill the form to add your favorite dish</small>
            </div>
            <form className="card-body p-4" onSubmit={onSubmitHandler}>
              {/* Image Upload */}
              <div className="mb-4 text-center">
                <label htmlFor="image" className="form-label fw-semibold d-block">
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="file-upload"
                    width={72}
                    height={72}
                    className="mb-2 rounded-circle border border-2"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  className="form-control rounded-3"
                  id="image"
                  name="image"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Food Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="name"
                  name="name"
                  placeholder="e.g. Chicken Biryani"
                  required
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">
                  Description
                </label>
                <textarea
                  className="form-control rounded-3 shadow-sm"
                  id="description"
                  name="description"
                  placeholder="Enter a short description about the food"
                  rows="3"
                  required
                  onChange={onChangeHandler}
                  value={data.description}
                ></textarea>
              </div>

              {/* Category */}
              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-semibold">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select rounded-3 shadow-sm"
                  required
                  onChange={onChangeHandler}
                  value={data.category}
                >
                  <option value="">-- Select category --</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Ice cream">Ice Cream</option>
                </select>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label htmlFor="price" className="form-label fw-semibold">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control rounded-3 shadow-sm"
                  id="price"
                  name="price"
                  placeholder="Enter price in $"
                  min="1"
                  step="0.01"
                  required
                  onChange={onChangeHandler}
                  value={data.price}
                />
              </div>

              {/* Submit */}
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-success btn-lg rounded-3 fw-bold"
                  style={{
                    background: "linear-gradient(90deg, #28a745, #71dd8a)",
                    border: "none",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "linear-gradient(90deg, #34c759, #8de7a0)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "linear-gradient(90deg, #28a745, #71dd8a)")
                  }
                >
                  ➕ Save Food
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
