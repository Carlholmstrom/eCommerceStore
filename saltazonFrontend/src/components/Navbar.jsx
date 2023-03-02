import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function NavBar({ isAuthenticated, setToken, currentCart, role }) {
  const [cookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    localStorage.clear();
    navigate("/");
  };

  const cartCount =
    currentCart.cart.length > 0
      ? currentCart.cart.reduce((total, item) => total + item.amount, 0)
      : null;

  return (
    <AppBar sx={{ mb: 3 }} position="static" style={{ background: "#2E3B55" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated && (
            <Link
              to={"/"}
              style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
            >
              Products
            </Link>
          )}
        </div>

        <div>
          {role === "admin" && (
            <Link
              to={"/admin"}
              style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
            >
              Admin
            </Link>
          )}

          {role === "super-admin" && (
            <Link
              to={"/admin/super"}
              style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
            >
              SuperAdmin
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              to={"/create-new-user"}
              style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
            >
              Create new user
            </Link>
          )}

          {isAuthenticated && (
            <Link
              to={"/cart"}
              style={{ color: "#FFF", textDecoration: "none", marginRight: 20 }}
            >
              Cart {cartCount && `(${cartCount})`}
            </Link>
          )}

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
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
