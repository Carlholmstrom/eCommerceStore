import { useCookies } from "react-cookie";
import { useEffect } from "react";

function ProfileBar({ isLoggedIn }) {
  const [cookies] = useCookies(["token"]);
  const userRole = cookies.token
    ? JSON.parse(atob(cookies.token.split(".")[1]))[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    : null;

  return (
    <div className="login_info">
      {isLoggedIn ? (
        <h1>Logged in as {userRole}</h1>
      ) : (
        <>
          <h1>Welcome to the store</h1>

          <p>Please login or create a user to start shopping</p>
        </>
      )}
    </div>
  );
}

export default ProfileBar;
