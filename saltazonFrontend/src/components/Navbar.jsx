import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
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
          Go to cart
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
