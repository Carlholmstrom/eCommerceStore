import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TextField, Button, Typography } from "@mui/material";
import validator from "validator";
import { toast } from "react-toastify";
import "./login.css";
import SendIcon from "@mui/icons-material/Send";

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
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
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
          sx={{ m: 1, mb: 3, width: 300 }}
          label="Password"
          type="password"
          placeholder="password"
          id="password_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          sx={{ mr: 1, width: 200 }}
          variant="contained"
          color="success"
          type="submit"
          endIcon={<SendIcon />}
        >
          Login
        </Button>
        <Button
          sx={{ width: 100 }}
          variant="contained"
          color="primary"
          component={Link}
          to={"/"}
        >
          Back
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
