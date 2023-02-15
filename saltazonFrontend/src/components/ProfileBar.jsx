import { useCookies } from "react-cookie";

function ProfileBar() {
  const [cookies] = useCookies(["token"]);
  const userRole = cookies.token
    ? JSON.parse(atob(cookies.token.split(".")[1]))[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    : null;

  return (
    <div className="login_info">
      {userRole ? (
        <h1>Logged in as {userRole}</h1>
      ) : (
        <h1>Welcome to the store</h1>
      )}
    </div>
  );
}

export default ProfileBar;
