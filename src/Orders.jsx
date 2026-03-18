import React from "react";
import { useSelector } from "react-redux";
import "./Orders.css";

function Orders() {
  const orders = useSelector((state) => state.orders);

  return (
    <div className="orders-page">
      <h2 className="orders-title">🧾 Order History</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No Orders Yet</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h3 className="order-number">Order #{index + 1}</h3>

            <div className="items-box">
              <h4>Items</h4>
              {order.items.map((item, i) => (
                <div key={i} className="item-row">
                  <span>{item.name}</span>
                  <span className="qty">Qty: {item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-details">
              <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
              <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
              <p><strong>Date:</strong> {order.date}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;