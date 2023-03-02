import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CartItem({ cartItem, removeFromCart }) {
  const product = cartItem.product;

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return (
    <Card sx={{ display: "flex", mb: 2, width: 600, margin: "auto" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, minWidth: 80 }}
        image={product.imageUrl}
        alt="product image"
      />
      <CardContent sx={{ flex: "1 1 auto" }}>
        <Typography variant="h6" component="h2">
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {product.price}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Amount: {cartItem.amount}
        </Typography>
      </CardContent>
      <IconButton
        aria-label="delete"
        sx={{ alignSelf: "center", mr: 2, fontSize: "2rem" }}
        onClick={handleRemoveFromCart}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
}

export default CartItem;
