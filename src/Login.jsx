import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {

    // Get registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check user
    const validUser = users.find(
      (user) =>
        user.email === data.email &&
        user.password === data.password
    );

    if (validUser) {
      alert("Login Successful");

      // ✅ IMPORTANT: store logged-in user
      localStorage.setItem("currentUser", JSON.stringify(validUser));

      localStorage.setItem("isLoggedIn", "true");

      // Redirect to home
      navigate("/");

       window.location.reload(); 

    } else {
      alert("Invalid Email or Password");
    }

    reset();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>

        {/* Register Link */}
        <p className="register-text">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}

export default Login;