import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="contact-container">

      <h1 className="contact-title">Get In Touch</h1>
      <p className="contact-subtitle">
        We'd love to hear from you. Send us a message and we will respond soon.
      </p>

      <div className="contact-content">

        {/* Contact Info */}
        <div className="contact-info">

          <div className="info-card">
            <h3>📍 Address</h3>
            <p>Hyderabad, India</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 9392757779</p>
          </div>

          <div className="info-card">
            <h3> Email</h3>
            <p>sivakumards419@gmail.com</p>
          </div>

        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>

        </form>

      </div>

      {/* Map */}
      <div className="map-section">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>

    </div>
  );
}

export default ContactUs;