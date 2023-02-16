import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TextField, Button } from "@mui/material";

function LoginForm({ onSubmit, userInfo, setUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  // const getUserData = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5179/Api/Users/${id}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("Token")}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       // console.log(data);
  //       const fetchedUserData = userInfo;
  //       fetchedUserData.id = data.id;
  //       fetchedUserData.email = data.email;
  //       fetchedUserData.role = data.role;
  //       fetchedUserData.storeId = data.storeId;
  //       console.log(
  //         "////////////////////////////////////////////////////////////////"
  //       );
  //       setUserInfo(fetchedUserData);
  //       console.log(userInfo);
  //       console.log(
  //         "////////////////////////////////////////////////////////////////"
  //       );
  //     } else {
  //       console.log("Error:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log("hej");
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
        onSubmit(token);
        console.log(token);
        alert("Login success!");
        navigate("/");

        setCookie("token", token, {
          path: "/",
          maxAge: 3600, // expires in 1 hour
          sameSite: "strict",
        });

        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const id =
          decodedPayload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        console.log(id);
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
        <TextField
          sx={{ m: 1, width: 300 }}
          label="Email"
          placeholder="email"
          id="email_input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <TextField
          sx={{ m: 1, width: 300 }}
          label="Password"
          type="password"
          placeholder="password"
          id="password_input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
