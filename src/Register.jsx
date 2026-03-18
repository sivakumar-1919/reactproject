import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    reset();
    navigate("/login");
  };

  const password = watch("password");

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* Phone */}
          <input
            type="tel"
            placeholder="Enter Phone Number"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}

          {/* Password */}
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <button type="submit">Register</button>

          {/* Login Link */}
          <p className="login-text">
            Already have an account?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;