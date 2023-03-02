import { Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CartItem from "./CartItem.jsx";

function Cart({ currentCart, removeFromCart }) {
  if (currentCart.cart < 1) {
    return (
      <>
        <h3>No items in cart, why not add some?</h3>
        <Button sx={{ m: 3 }} component={Link} to="/" variant="contained">
          Go Shopping
        </Button>
      </>
    );
  }
  const sumOfItems = currentCart.cart.reduce((acc, cartItem) => {
    const price = parseFloat(cartItem.product.price.replace("$", ""));
    return acc + price * cartItem.amount;
  }, 0);
  return (
    <div>
      {currentCart.cart.map((cartItem) => (
        <Card key={cartItem.product.id} variant="outlined">
          <CardContent>
            <CartItem cartItem={cartItem} removeFromCart={removeFromCart} />
          </CardContent>
        </Card>
      ))}
      <h3>Total price for items: {sumOfItems.toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
