import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CookiesProvider, withCookies, Cookies } from "react-cookie";
import NavBar from "./components/Navbar.jsx";
import Cart from "./components/checkout/Cart.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import LoginForm from "./components/login/LoginForm.jsx";
import NewUserForm from "./components/login/NewUserForm.jsx";
import SuperAdminPage from "./admin/SuperAdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";

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

  const removeFromCart = (productId) => {
    const index = currentCart.cart.findIndex(
      (cartItem) => cartItem.product.id === productId
    );
    if (index !== -1) {
      if (currentCart.cart[index].amount > 1) {
        const updatedItems = [...currentCart.cart];
        updatedItems[index].amount = currentCart.cart[index].amount - 1;
        const updatedCart = { ...currentCart, cart: updatedItems };
        setCurrentCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        const updatedItems = currentCart.cart.filter(
          (cartItem) => cartItem.product.id !== productId
        );
        const updatedCart = { ...currentCart, cart: updatedItems };
        setCurrentCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <div className="App">
      <Router>
        <header className={"top_header"}>
          <NavBar token={token} setToken={setToken} />
        </header>
        <main>
          <ProfileBar />
          <button onClick={() => console.log(currentCart)}>
            Clix me for currentCart
          </button>

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
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/admin/super" element={<SuperAdminPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

// import "./App.css";
// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { CookiesProvider, withCookies, Cookies } from "react-cookie";
// import NavBar from "./components/Navbar.jsx";
// import Cart from "./components/checkout/Cart.jsx";
// import AdminPage from "./admin/AdminPage.jsx";
// import ProductList from "./components/Products/ProductList.jsx";
// import LoginForm from "./components/login/LoginForm.jsx";
// import NewUserForm from "./components/login/NewUserForm.jsx";
// import SuperAdminPage from "./admin/SuperAdminPage.jsx";
// import ProfileBar from "./components/ProfileBar.jsx";

// const [currentCart, setCurrentCart] = useState(getCurrentCart());
// function addToCart(product) {
//   const productIndex = currentCart.cart.findIndex(
//     (cartItem) => cartItem.product === product
//   );
//   if (productIndex === -1) {
//     const updatedItems = [...currentCart.cart, { product: product, amount: 1 }];
//     const updatedCart = { cart: updatedItems };
//     setCurrentCart(updatedCart);
//   } else {
//     const updatedItems = currentCart.cart.map((cartItem, index) => {
//       if (index === productIndex) {
//         return { ...cartItem, amount: cartItem.amount + 1 };
//       }
//       return cartItem;
//     });
//     const updatedCart = { ...currentCart, cart: updatedItems };
//     setCurrentCart(updatedCart);
//   }
// }
// const removeFromCart = (productId) => {
//   const index = currentCart.cart.findIndex(
//     (cartItem) => cartItem.product.id === productId
//   );
//   if (index !== -1) {
//     if (currentCart.cart[index].amount > 1) {
//       const updatedItems = [...currentCart.cart];
//       updatedItems[index].amount = currentCart.cart[index].amount - 1;
//       const updatedCart = { ...currentCart, cart: updatedItems };
//       setCurrentCart(updatedCart);
//     } else {
//       const updatedItems = currentCart.cart.filter(
//         (cartItem) => cartItem.product.id !== productId
//       );
//       const updatedCart = { ...currentCart, cart: updatedItems };
//       setCurrentCart(updatedCart);
//     }
//   }
// };
// function getCurrentCart() {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   if (!cart) {
//     cart = { cart: [] };
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }
//   return cart;
// }

// function App() {
//   const [token, setToken] = useState(null);
//   const [currentCart, setCurrentCart] = useState([]);
//   const [userInfo, setUserInfo] = useState({
//     id: 0,
//     email: "",
//     role: "",
//     storeId: 0,
//   });
//   const [productData, setProductData] = useState([]);
//   const [userRole, setUserRole] = useState("");

//   const cookies = new Cookies();

//   useEffect(() => {
//     const getCurrentCart = () => {
//       // Update to get from local storage
//     };
//     setCurrentCart(getCurrentCart());
//   }, []);

//   useEffect(() => {
//     const tokenFromCookie = cookies.get("token");
//     if (tokenFromCookie) {
//       setToken(tokenFromCookie);
//     }
//   }, [cookies]);

//   const handleLogin = (token, role) => {
//     setToken(token);
//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     setUserInfo({
//       id: decodedToken[
//         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//       ],
//       email:
//         decodedToken[
//           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
//         ],
//       role: role,
//       storeId: decodedToken["storeId"],
//     });
//     setUserRole(role);
//     cookies.set("token", token, { path: "/" });
//   };

//   const isAuthenticated = () => {
//     if (token) {
//       const decodedToken = JSON.parse(atob(token.split(".")[1]));
//       const role =
//         decodedToken[
//           "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//         ];
//       return role === "user" || role === "admin" || role === "super-admin";
//     }
//     return false;
//   };

//   const isAdmin = () => {
//     if (userInfo && userInfo.role) {
//       // check if userInfo has been set
//       return userInfo.role === "admin" || userInfo.role === "super-admin";
//     }
//     return false;
//   };

//   const isSuperAdmin = () => {
//     return userInfo.role === "super-admin";
//   };

//   return (
//     <div className="App">
//       <Router>
//         <header className={"top_header"}>
//           <NavBar token={token} setToken={setToken} userInfo={userInfo} />
//         </header>
//         <main>
//           <ProfileBar userInfo={userInfo} />
//           <Routes>
//             <Route
//               exact
//               path="/admin"
//               element={isAdmin() ? <AdminPage /> : <Navigate to="/login" />}
//             />

//             <Route
//               exact
//               path="/admin/super"
//               element={
//                 isSuperAdmin() ? <SuperAdminPage /> : <Navigate to="/login" />
//               }
//             />
//             <Route
//               exact
//               path="/create-new-user"
//               element={<NewUserForm onSubmit={handleLogin} />}
//             />
//             <Route
//               exact
//               path="/login"
//               element={
//                 <LoginForm
//                   onSubmit={handleLogin}
//                   setUserInfo={setUserInfo}
//                   userInfo={userInfo}
//                 />
//               }
//             />
//             <Route
//               exact
//               path="/"
//               element={
//                 isAuthenticated() ? (
//                   userRole ? ( // check if userRole has been set
//                     <ProductList
//                       productData={productData}
//                       addToCart={addToCart}
//                       userRole={userRole} // pass the userRole as a prop
//                     />
//                   ) : (
//                     // render a loading component until userRole is set
//                     <div>Loading...</div>
//                   )
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//           </Routes>
//         </main>
//       </Router>
//     </div>
//   );
// }

// export default App;
