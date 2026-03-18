import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQty, decrementQty, clearCart } from "./CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { coupons } from "./Coupons"; 
import { QRCode }  from "react-qr-code";
import emailjs from "@emailjs/browser";
import "./Cart.css";
import { addOrder } from "./OrderSlice";
import { useNavigate } from "react-router-dom";




function Cart() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
  return (
    <div className="login-warning">
      <div className="login-box">
        <h2>Please login to view your cart</h2>

        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

  // OLD STATE (manual discount buttons)
  const [discountPer, setDiscountPer] = useState(0);
 

  // NEW STATE (coupon)
  const [couponInput, setCouponInput] = useState("");
  const [couponPer, setCouponPer] = useState(0);
  const [message, setMessage] = useState("");

  // ✅ NEW PAYMENT
    const [paymentMethod, setPaymentMethod] = useState("");

    const [customerEmail, setCustomerEmail] = useState("");



  // TOTAL
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // DISCOUNT CALCULATIONS
  const manualDiscountAmount = (totalAmount * discountPer) / 100;
  const couponDiscountAmount = (totalAmount * couponPer) / 100;

  const totalDiscount = manualDiscountAmount + couponDiscountAmount;

  const priceAfterDiscount = totalAmount - totalDiscount;

  const gst = priceAfterDiscount * 0.18;
  const finalAmount = priceAfterDiscount + gst;

  // APPLY COUPON FUNCTION
  const applyCoupon = () => {
    const code = couponInput.toUpperCase();

    if (coupons[code]) {
      setCouponPer(coupons[code]);
      setMessage(`Coupon ${code} applied (${coupons[code]}%) ✅`);
    } else {
      setCouponPer(0);
      setMessage("Invalid Coupon ❌");
    }
  };

   const templateParams = {
      order_id: "ORDER123",
      orders: cartItems.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity,
      })),
      cost: {
        shipping: 50,
        tax: gst.toFixed(2),
        total: finalAmount.toFixed(2),
      },
      email: customerEmail,
    };

    const handleCheckOut = ()=>{

        // 1️⃣ Validate payment
  if (!paymentMethod) {
    alert("Please select payment method");
    return;
  }

  // 2️⃣ Validate email
  if (!customerEmail) {
    alert("Please enter your email");
  }
        emailjs.send( "service_rf4wpfa", "template_covioys", templateParams,"ZWA2bEde1dWfH789D")
      .then(() => {alert("Order placed & Email sent successfully!");
       })
      .catch((error) => {
        alert("Email sending failed");
        console.error(error);
      });
       const orderData = {
    items: cartItems,
    total: finalAmount,
    paymentMethod: paymentMethod,
    date: new Date().toLocaleString(),
  };

  dispatch(addOrder(orderData));  // SAVE ORDER
           

  alert("Order Placed Successfully!");

    }

  // CART ITEMS
  const listItems = cartItems.map((item, index) => (
    <li key={index}>
      {item.name} - ₹{item.price} × {item.quantity}
     
    </li>
  ));  

  return (
  <div className="page-center">
    <div className="cart-layout">

      {/* LEFT SIDE */}
      <div className="cart-left">

        {cartItems.length === 0 ? (
          <h1 className="empty-cart">🛒 Your Cart is Empty</h1>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <h3>{item.name}</h3>
                <p className="item-total"> Total: ₹{(item.price * item.quantity).toFixed(2)}</p>

                <button className="qty-btn" onClick={() => dispatch(decrementQty(item.name))}>−</button>

                <span className="qty-number">{item.quantity}</span>

                <button className="qty-btn" onClick={() => dispatch(incrementQty(item.name))}>+</button>

                <button
                  className="remove-btn"
                  onClick={() => {
                    dispatch(removeFromCart(item.name));
                    toast.error(`${item.name} removed`);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT SIDE BILL */}
      {cartItems.length > 0 && (
        <div className="bill-container">

          <h2>Bill Summary</h2>

          {/* COUPON */}
          <input
            type="text"
            placeholder="Enter coupon"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button className="apply-btn" onClick={applyCoupon}>Apply</button>

          <p className="coupon-msg">{message}</p>

          {/* DISCOUNT */}
          <div className="discount-buttons">
            <button className="discount-btn" onClick={() => setDiscountPer(10)}>10%</button>
            <button className="discount-btn" onClick={() => setDiscountPer(20)}>20%</button>
            <button className="discount-btn" onClick={() => setDiscountPer(30)}>30%</button>
          </div>

         {/* BILL DETAILS */}
<div className="bill-row"><span>Total</span><span>₹ {totalAmount.toFixed(2)}</span></div>

<div className="bill-row">
  <span>Manual Discount</span>
  <span>- ₹ {manualDiscountAmount.toFixed(2)}</span>
</div>

<div className="bill-row">
  <span>Coupon Discount</span>
  <span>- ₹ {couponDiscountAmount.toFixed(2)}</span>
</div>

<div className="bill-row total-discount">
  <span>Total Discount</span>
  <span>- ₹ {totalDiscount.toFixed(2)}</span>
</div>

<div className="bill-row"><span>GST</span><span>₹ {gst.toFixed(2)}</span></div>

<div className="final-amount">
  Final Amount: ₹ {finalAmount.toFixed(2)}
</div>

          {/* PAYMENT */}
          <div className="payment-section">
            <button className="payment-btn" onClick={() => setPaymentMethod("upi")}>UPI</button>
            <button className="payment-btn" onClick={() => setPaymentMethod("card")}>Card</button>
            <button className="payment-btn" onClick={() => setPaymentMethod("cod")}>COD</button>
          </div>

          {paymentMethod === "upi" && (
            <div className="upi-box">
              <h3>Scan to Pay ₹{finalAmount.toFixed(2)}</h3>
              <QRCode
                value={`upi://pay?pa=9392757779-3@axl&pn=FoodZone&am=${finalAmount.toFixed(2)}&cu=INR`}
                size={200}
              />
              <h3>UPI ID:9392757779-3@axl </h3>
            </div>
          )}
          {paymentMethod === "card" && (
  <div className="upi-box">
     <p>card details UI added soon</p>
     </div>
)}

{paymentMethod === "cod" && (
  <div className="upi-box">
    <h3>Cash on Delivery</h3>
    <p>Pay when your order arrives at your doorstep.</p>

    <div className="cod-badge">
      🚚 No online payment required
    </div>
  </div>
)}

          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="Enter email"
          />

          <button className="checkout-btn" onClick={handleCheckOut}>
            Pay Now & Place Order
          </button>

          <button className="clear-btn" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>

        </div>
      )}

    </div>
  </div>
);
  
}

export default Cart;   