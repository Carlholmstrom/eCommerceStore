import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileBar from "./ProfileBar.jsx";

function NavBar({ token, setToken, userInfo, currentCart }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("token");
    setToken(null);
    localStorage.clear();
    navigate("/login");
  };

  const cartCount =
    currentCart.cart.length > 0
      ? currentCart.cart.reduce((total, item) => total + item.amount, 0)
      : null;

  return (
    <AppBar sx={{ mb: 3 }} position="static" style={{ background: "#2E3B55" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>

        <Link
          to={"/"}
          style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
        >
          Show me all the items
        </Link>

        <Link
          to={"/create-new-user"}
          style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
        >
          Create new user
        </Link>

        <Link
          to={"/cart"}
          style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
        >
          Cart {cartCount && `(${cartCount})`}
        </Link>

        {cookies.token ? (
          <>
            <Button color="inherit" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        ) : (
          <Link
            to={"/login"}
            style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
          >
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
