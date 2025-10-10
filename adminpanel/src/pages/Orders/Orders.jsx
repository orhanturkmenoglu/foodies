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

    // Optimistic update (ekran hemen yenilensin)
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
      // Hata durumunda eski hali geri yükle
      fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card shadow-sm p-3">
          <h4 className="mb-4 text-center fw-bold">All Orders</h4>

          <div className="table-responsive">
            <table className="table align-middle">
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
                {data && data.length > 0 ? (
                  data.map((order, index) => (
                    <tr key={order.id || index}>
                      <td>
                        <img
                          src={assets.parcel}
                          alt="Order"
                          height={48}
                          width={48}
                          className="rounded"
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
                      <td>₺{order.amount?.toFixed(2) || "0.00"}</td>
                      <td>{order.orderedItems?.length || 0}</td>

                      <td>
                        <select
                          className="form-select"
                          onChange={(event) => updateStatus(event, order.id)}
                          value={order.orderStatus || "Food Preparing"}
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
};

export default Orders;
