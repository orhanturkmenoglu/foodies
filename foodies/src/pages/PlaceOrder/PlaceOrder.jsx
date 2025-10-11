import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { calculateCardTotals } from "../../util/CartUtils";
import axios from "axios";
import { toast } from "react-toastify";
import { STRIPE_PUBLISHABLE_KEY } from "../../util/Constants";
import { useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderData, token, clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { clientSecret, id } = response.data;

      if (!clientSecret) {
        toast.error("Ödeme başlatılamadı. Lütfen tekrar deneyin.");
        return;
      }

      // Stripe ödeme onayı
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.log("Stripe Error:", error);
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Ödeme başarılı 🎉");
        await clearCart();
        navigate("/myorders");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <div className="mb-3">
        <label className="fw-semibold">Card Details</label>
        <div className="p-3 border rounded">
          <CardElement />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg w-100 mt-3"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCardTotals(
    cartItems,
    quantities
  );

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const orderData = {
    userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
    phoneNumber: data.phoneNumber,
    email: data.email,
    orderedItems: cartItems.map((item) => ({
      foodId: item.id,
      quantity: quantities[item.id],
      price: item.price * quantities[item.id],
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description,
      name: item.name,
    })),
    amount: total.toFixed(2),
    orderStatus: "Preparing",
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuantities({});
    } catch (error) {
      toast.error("Error while clearing the cart.",error);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2>Checkout</h2>
        <p className="text-muted">
          Please fill in your details to complete your order.
        </p>
      </div>

      <div className="row">
        {/* Sağ taraf: Sepet Özeti */}
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Cart</span>
            <span className="badge bg-primary rounded-pill">
              {cartItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between lh-condensed"
              >
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">
                    Qty: {quantities[item.id]}
                  </small>
                </div>
                <span className="text-muted">
                  ${(item.price * quantities[item.id]).toFixed(2)}
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <strong>${subtotal === 0 ? 0.0 : shipping.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tax (10%)</span>
              <strong>${tax.toFixed(2)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between border-top mt-2 pt-2">
              <span className="fw-bold fs-5 text-dark">Total</span>
              <strong className="text-success fs-5">
                ${total.toFixed(2)}
              </strong>
            </li>
          </ul>
        </div>

        {/* Sol taraf: Adres + Ödeme Formu */}
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing Details</h4>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                required
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                placeholder="5555555555"
                required
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
                name="address"
                value={data.address}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="state"
                  value={data.state}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Istanbul</option>
                  <option>Ankara</option>
                  <option>Izmir</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="city">City</label>
                <select
                  className="form-select"
                  id="city"
                  required
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option>Kadikoy</option>
                  <option>Beyoglu</option>
                  <option>Uskudar</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  required
                  name="zip"
                  value={data.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="mb-4" />
          </form>

          {/* Stripe ödeme alanı */}
          <Elements stripe={stripePromise}>
            <CheckoutForm
              orderData={orderData}
              token={token}
              clearCart={clearCart}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};
