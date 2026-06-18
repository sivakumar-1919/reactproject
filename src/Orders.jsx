
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { Navigate } from "react-router-dom";

function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (user) {
      axios
        .get(`https://order-service-olem.onrender.com/orders/user/${user.id}`)
        .then((res) => {
         setOrders(
  res.data.sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  )
);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="orders-page">

      <h2 className="orders-title">🧾 Order History</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No Orders Yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order-card">

            <h3 className="order-number">
              Order ID: {order.orderId}
            </h3>

            <div className="items-box">
              <h4>Items</h4>

              {order.orderItems?.map((item) => (
                <div key={item.orderItemId} className="item-row">

                  <span>{item.productName}</span>

                  <span className="qty">
                    Qty: {item.quantity}
                  </span>

                </div>
              ))}

            </div>

            <div className="order-details">

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Payment:</strong> {order.paymentMethod?.toUpperCase()}
              </p>

             <p>
  <strong>Date:</strong>{" "}
  {new Date(order.orderDate).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })} IST
</p>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Orders;