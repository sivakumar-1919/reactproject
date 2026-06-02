import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {

  const navigate = useNavigate();

 useEffect(() => {

  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const email = params.get("email");
  const name = params.get("name");

  if (token) {

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem("currentUser", JSON.stringify({
      email: email,
      name: name
    }));
  }

  navigate("/");
  window.location.reload();

}, []);

  return <h2>Logging in...</h2>;
}

export default OAuthSuccess;