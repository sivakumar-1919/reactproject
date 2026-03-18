import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>About Our Food App</h1>
        <p>Fresh Food • Fast Delivery • Great Experience</p>
      </div>

      <div className="about-content">

        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Our Food App is designed to make food ordering easy and enjoyable.
            We provide fresh milk products, delicious chocolates, snacks,
            and many more items. Our platform ensures a smooth shopping
            experience with fast ordering and secure checkout.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide high quality food products with the best
            customer experience. We aim to make online food ordering simple,
            fast, and reliable for everyone.
          </p>
        </div>

        <div className="about-features">

          <div className="feature-card">
            <h3>🍫 Quality Products</h3>
            <p>We deliver only fresh and premium quality food items.</p>
          </div>

          <div className="feature-card">
            <h3>⚡Fast Ordering</h3>
            <p>Our app allows quick browsing and easy ordering.</p>
          </div>

          <div className="feature-card">
            <h3>❤️ Customer First</h3>
            <p>Customer satisfaction is our top priority.</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AboutUs;