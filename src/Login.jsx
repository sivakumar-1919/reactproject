import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();



  const onSubmit = async (data) => {

  try {

    const response = await axios.post(
      "https://jwttoken.mooo.com/api/auth/login",
      {
        email: data.email,
        password: data.password
      }
    );

      console.log(response.data); 

  localStorage.setItem("jwtToken", response.data.token);

localStorage.setItem(
  "currentUser",
  JSON.stringify({
    id: response.data.userId,   // ✅ FIXED
    name: response.data.name,
    email: response.data.email
  })
);

localStorage.setItem("userId", response.data.userId); // ✅ FIXED
localStorage.setItem("isLoggedIn", "true");

// 🔥 trigger update manually
window.dispatchEvent(new Event("storage"));

alert("Login Successful");

navigate("/");

  } catch (error) {

    alert("Invalid Email or Password");

  }

  reset();
};

 // ✅ Google Login
  const googleLogin = () => {
    window.location.href =
      "http://jwttoken.mooo.com:8081/oauth2/authorization/google";
  };

  //  ✅ GitHub LogIn
  const githubLogin = () => {
    window.location.href =
      "http://jwttoken.mooo.com:8081/oauth2/authorization/github";
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

         {/* 👇 GOOGLE LOGIN BELOW */}
      <div className="oauth-section">

        <p style={{ margin: "10px 0" }}>OR</p>

      <button
  type="button"
  onClick={() =>
    window.location.href =
      "http://jwttoken.mooo.com:8081/oauth2/authorization/google"
  }
  className="google-btn"
>
  <i className="fab fa-google"></i>
  Continue with Google
</button>

<button
  type="button"
  onClick={() =>
    window.location.href =
      "http://jwttoken.mooo.com:8081/oauth2/authorization/github"
  }
  className="github-btn"
>
  <i className="fab fa-github"></i>
  Continue with GitHub
</button>
 </div>

      </form>

       

    </div>
  );
}

export default Login;