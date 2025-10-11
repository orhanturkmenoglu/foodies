import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../ListFood/ListFood.css"; // css dosyamızı import ettik ✅
import { getFoodList, deleteFood } from "../../services/foodService";

const ListFood = () => {
  const [listData, setListData] = useState([]);

  const listFood = async () => {
    try {
      const data = await getFoodList();
      setListData(data);
    } catch (error) {
      toast.error("Error while reading the foods.", error);
    }
  };

  const removeFood = async (foodId) => {
    console.log(foodId);
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food deleted successfully!");
        await listFood();
      } else {
        toast.error("Error while deleting the food.");
      }
    } catch (error) {
      toast.error("Error while deleting the food.", error);
    }
  };

  
  useEffect(() => {
    listFood();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card shadow-lg rounded-4 border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center rounded-top-4">
          <h5 className="mb-0">🍔 Food List</h5>
          <span className="badge bg-warning text-dark">
            Total: {listData.lenght}
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {listData.length > 0 ? (
                listData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        height={50}
                        width={50}
                        className="rounded-circle shadow-sm"
                      />
                    </td>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {item.category}
                      </span>
                    </td>
                    <td className="text-muted" style={{ maxWidth: "250px" }}>
                      {item.description}
                    </td>
                    <td>
                      <span className="fw-bold text-success">
                        {item.price}₺
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="delete-btn"
                        onClick={() => removeFood(item.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    <i className="bi bi-emoji-frown fs-3 d-block"></i>
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListFood;
