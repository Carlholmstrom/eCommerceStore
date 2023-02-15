import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import { fakeProducts } from "./fakedata/fakedata";

function addToCart(productId) {
  console.log("Add " + productId + " From the App");
  //add item to the current Cart
}

function removeFromCart(productId) {
  console.log("Remove " + productId + " From the App");
  //remove item from the current Cart
}

function getCurrentCart() {
  //update to get from localstorage
}

function App() {
  const [token, setToken] = useState(null);
  const [currentCart, setCurrentCart] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: "",
    role: "",
    storeId: 0,
  });

  useEffect(() => {
    const getCurrentCart = () => {
      // Update to get from local storage
    };
    setCurrentCart(getCurrentCart());
  }, []);

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div className="App">
      <Router>
        <header className={"top_header"}>
          <ProfileBar />
          <NavBar token={token} setToken={setToken} />
        </header>
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
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart products={currentCart} removeFromCart={removeFromCart} />
            }
          />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/admin/super" element={<SuperAdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
