import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (event, orderId) => {
    const newStatus = event.target.value;

    setData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/status/${orderId}`,
        null,
        { params: { status: newStatus } }
      );

      if (response.status === 200) {
        console.log("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status!");
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Food Preparing":
        return "bg-warning text-dark";
      case "Out for delivery":
        return "bg-info text-dark";
      case "Delivered":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card shadow-lg rounded-4 border-0">
          <div className="card-header bg-dark text-white rounded-top-4 d-flex justify-content-between align-items-center">
            <h5 className="mb-0">📦 All Orders</h5>
            <span className="badge bg-primary px-3 py-2">
              Total: {data.length}
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Items</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>Count</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((order, index) => (
                    <tr key={order.id || index}>
                      <td>
                        <img
                          src={assets.parcel}
                          alt="Order"
                          height={48}
                          width={48}
                          className="rounded shadow-sm"
                        />
                      </td>
                      <td>
                        {order.orderedItems?.map((item, i) => (
                          <span key={i}>
                            {item.name} x {item.quantity}
                            {i < order.orderedItems.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                      <td>{order.userAddress || "-"}</td>
                      <td>
                        <span className="fw-bold text-success">
                          ₺{order.amount?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {order.orderedItems?.length || 0}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`form-select ${statusColor(order.orderStatus)}`}
                          onChange={(event) => updateStatus(event, order.id)}
                          value={order.orderStatus || "Food Preparing"}
                          style={{ fontWeight: "600" }}
                        >
                          <option value="Food Preparing">Food Preparing</option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="bi bi-emoji-frown fs-3 d-block mb-2"></i>
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
};

export default Orders;
