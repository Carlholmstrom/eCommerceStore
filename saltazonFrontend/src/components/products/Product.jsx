import "./Product.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function Product({ product, addToCart }) {
  return (
    <Card sx={{ height: 350, maxWidth: 350, margin: 2, border: 1 }}>
      <CardMedia
        component="img"
        sx={{ height: "50%" }}
        image={product.imageUrl}
        alt={"picture of product"}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.substring(0, 40) + "..."}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Button variant="contained" onClick={() => addToCart(product.id)}>
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Product;
