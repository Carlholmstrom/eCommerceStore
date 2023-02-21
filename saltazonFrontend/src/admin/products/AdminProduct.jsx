import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputLabel,
  Input,
} from "@mui/material";

function AdminProduct({ product, storeId }) {
  const [cookies] = useCookies(["token"]);

  const handleDelete = async () => {
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
      console.log(storeId);
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeId}/product/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Product deleted successfully");
      } else {
        console.log("Error deleting product");
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    const token = cookies.token;
    if (token) {
      console.log(token);
      console.log(quantity);
      const response = await fetch(
        `http://localhost:5179/api/Products/${id}/quantity`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (response.ok) {
        console.log("Quantity updated successfully");
      } else {
        console.log("Error updating quantity");
      }
    }
  };

  return (
    <Card sx={{ height: 400, maxWidth: 350, margin: 2, border: 1 }}>
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <InputLabel htmlFor="quantity" sx={{ mr: 1 }}>
            Quantity:
          </InputLabel>
          <Input
            id="quantity"
            type="number"
            value={product.quantity}
            // onChange={handleQuantityChange}
            sx={{ width: 75 }}
          />
        </Box>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        <Button
          variant="contained"
          onClick={() => updateQuantity(product.id, quantity)}
          sx={{ mr: 1 }}
        >
          Update quantity
        </Button>
        <Button variant="contained" onClick={handleDelete}>
          Delete product
        </Button>
      </Box>
    </Card>
  );
}

export default AdminProduct;
