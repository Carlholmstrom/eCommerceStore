import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NavBar from "./components/Navbar.jsx";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin.jsx";
import ProtectedRouteSuperAdmin from "./components/ProtectedRouteSuperAdmin.jsx";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import AdminProductList from "./admin/products/AdminProductList.jsx";
import useAuth from "./components/useAuth";

function App() {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: "",
    role: "",
    storeId: 0,
  });
  const [productData, setProductData] = useState([]);
  const [currentCart, setCurrentCart] = useState({ cart: [] });
  const cookies = new Cookies();

  //const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    const getCurrentCart = () => {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = { cart: [] };
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      return cart;
    };
    setCurrentCart(getCurrentCart());
  }, []);

  function addToCart(product) {
    const productIndex = currentCart.cart.findIndex(
      (cartItem) => cartItem.product === product
    );
    if (productIndex === -1) {
      const updatedItems = [
        ...currentCart.cart,
        { product: product, amount: 1 },
      ];
      const updatedCart = { cart: updatedItems };
      setCurrentCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item placed in cart!");
    } else {
      const updatedItems = currentCart.cart.map((cartItem, index) => {
        if (index === productIndex) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      const updatedCart = { ...currentCart, cart: updatedItems };
      setCurrentCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }

  const removeFromCart = (product) => {
    const index = currentCart.cart.findIndex(
      (cartItem) => cartItem.product === product
    );
    console.log("Currentcart:", currentCart);
    console.log("Index:", index);
    if (index !== -1) {
      const updatedItems = [...currentCart.cart];
      if (currentCart.cart[index].amount > 1) {
        updatedItems[index].amount = currentCart.cart[index].amount - 1;
      } else {
        updatedItems.splice(index, 1);
      }
      const updatedCart = { ...currentCart, cart: updatedItems };
      setCurrentCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleLogin = (token) => {
    setToken(token);
  };

  const authToken = cookies.get("token");
  const decodedToken = authToken ? jwt_decode(authToken) : null;
  const role = decodedToken
    ? decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    : null;
  const isAuthenticated =
    authToken !== undefined &&
    authToken !== null &&
    decodedToken &&
    decodedToken.iss === "http://localhost:5179/";

  return (
    <div className="App">
      <Router>
        <header className={"top_header"}>
          <NavBar
            token={token}
            setToken={setToken}
            currentCart={currentCart}
            isAuthenticated={isAuthenticated}
            role={role}
          />
        </header>
        <main>
          <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            icon={<CheckCircleIcon />}
            className="green__toast"
          />
          <Routes>
            <Route
              exact
              path="/create-new-user"
              element={<NewUserForm onSubmit={handleLogin} />}
            />
            <Route
              exact
              path="/login"
              element={
                <LoginForm
                  onSubmit={handleLogin}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                />
              }
            />
            <Route
              exact
              path="/"
              element={<ProductList addToCart={addToCart} />}
            ></Route>
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  currentCart={currentCart}
                  removeFromCart={removeFromCart}
                />
              }
            ></Route>
            <Route
              exact
              path="/admin/super"
              element={
                <ProtectedRouteSuperAdmin
                  role={role}
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route
                exact
                path="/admin/super"
                element={<SuperAdminPage />}
              ></Route>
            </Route>
            <Route
              exact
              path="/admin"
              element={
                <ProtectedRouteAdmin
                  role={role}
                  isAuthenticated={isAuthenticated}
                />
              }
            >
              <Route exact path="/admin" element={<AdminPage />}></Route>
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
