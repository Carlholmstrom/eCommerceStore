import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5179/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      if (response.status === 200) {
        const token = await response.text();
        localStorage.setItem("token", token);
        onSubmit(token);
        console.log(token);
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const id =
          decodedPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        console.log(id);
        alert("Login success!");
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="login_form">
        <label htmlFor="email_input">Email</label>
        <input
          placeholder="email"
          id="email_input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <label htmlFor="password_input">Password</label>
        <input
          type="password"
          placeholder="password"
          id="password_input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
}

export default LoginForm;
