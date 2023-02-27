import CartItem from "./CartItem.jsx";

function Cart({ currentCart, removeFromCart }) {
  if (currentCart.amount === 0) {
    return <h3>No items in cart, why not add some?</h3>;
  }
  //  += ( parseFloat(cartItem.product.price.replace('$', '')));
  const sumOfItems = currentCart.cart.reduce((acc, cartItem) => {
    const price = parseFloat(cartItem.product.price.replace("$", ""));
    return acc + price * cartItem.amount;
  }, 0);
  return (
    <div>
      {currentCart.cart.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.product.id}
            cartItem={cartItem}
            removeFromCart={removeFromCart}
          />
        );
      })}
      <h3>Total price for items: {sumOfItems.toFixed(2)}</h3>
    </div>
  );
}
export default Cart;
