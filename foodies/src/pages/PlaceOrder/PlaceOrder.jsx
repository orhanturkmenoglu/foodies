import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

export const PlaceOrder = () => {
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );

  const shipping = subtotal === 0 ? 0.0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2>Checkout</h2>
        <p className="text-muted">
          Please fill in your details to complete your order.
        </p>
      </div>

      <div className="row">
        {/* Cart Summary */}
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Cart</span>
            <span className="badge badge-primary rounded-pill bg-primary ">
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
                    Qty : {quantities[item.id]}
                  </small>
                </div>
                <span className="text-muted">
                  &#8377;{item.price * quantities[item.id]}
                </span>
              </li>
            ))}

            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <strong>
                &#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}
              </strong>
            </li>

            <li className="list-group-item d-flex justify-content-between">
              <span>Tax (10%)</span>
              <strong>&#8377;{tax.toFixed(2)}</strong>
            </li>

            <li className="list-group-item d-flex justify-content-between border-top mt-2 pt-2">
              <span className="fw-bold fs-5 text-dark">Total (INR)</span>
              <strong className="text-success fs-5">
                &#8377;{total.toFixed(2)}
              </strong>
            </li>
          </ul>
        </div>

        {/* Billing & Payment */}
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
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
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
              />
            </div>

            {/* ✅ Country, State, Zip alanları */}
            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                  <option>Turkey</option>
                  <option>Germany</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="state">State / Province</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                  <option>Istanbul</option>
                  <option>Berlin</option>
                  <option>London</option>
                  <option>Ontario</option>
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required
                />
              </div>
            </div>

            <hr className="mb-4" />

            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Complete Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
