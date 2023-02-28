import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TextField, Button } from "@mui/material";
import validator from "validator";
import { toast } from "react-toastify";
import "./login.css";

function LoginForm({ onSubmit, setUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validator.isEmail(email)) {
        setEmailError(true);
        return;
      } else {
        setEmailError(false);
      }
      const response = await fetch("http://localhost:5179/Auth/Login", {
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
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const id =
          decodedPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        const role =
          decodedPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        onSubmit(token, role);
        setUserInfo({ id, role });
        console.log(token);
        toast.success("Login success!");
        navigate("/");

        setCookie("token", token, {
          path: "/",
          maxAge: 3600, // expires in 1 hour
          sameSite: "strict",
        });
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <>
      <h3>Please login to start shopping</h3>
      <form onSubmit={handleSubmit} className="login_form">
        <TextField
          sx={{ m: 1, width: 300 }}
          label="Email"
          placeholder="email"
          id="email_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Please enter a valid email address" : ""}
        />
        <br />
        <TextField
          sx={{ m: 1, width: 300 }}
          label="Password"
          type="password"
          placeholder="password"
          id="password_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          sx={{ m: 3, width: 300 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
