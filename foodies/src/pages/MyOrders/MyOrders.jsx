import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

export default function MyOrders() {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Siparişler alınamadı:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card shadow-sm p-3">
          <h4 className="mb-4 text-center fw-bold">My Orders</h4>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Count</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((order, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={assets.logo}
                          alt="Order"
                          height={48}
                          width={48}
                          className="rounded"
                        />
                      </td>
                      <td>
                        {order.orderedItems.map((item, i) =>
                          i === order.orderedItems.length - 1
                            ? `${item.name} x ${item.quantity}`
                            : `${item.name} x ${item.quantity}, `
                        )}
                      </td>
                      <td>${order.amount.toFixed(2)}</td>
                      <td>Items: {order.orderedItems.length}</td>
                      <td className="fw-bold text-capitalize">
                        ● {order.orderStatus}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={fetchOrders}
                          title="Refresh"
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
