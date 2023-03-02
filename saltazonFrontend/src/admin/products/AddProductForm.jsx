import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Grid, Typography, TextField, Button } from "@mui/material";

function AddProductForm({ storeId }) {
  const [cookies] = useCookies(["token"]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    quantity: 1,
    price: 0,
    category: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
      console.log(storeId);
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeId}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        console.log("Product added successfully");
        alert("Product added successfully");
        setProduct({
          title: "",
          description: "",
          quantity: 1,
          price: 0,
          category: "",
          imageUrl: "",
        });
      } else {
        console.log("Error adding product");
        alert("Error adding product");
      }
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: 3 }} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Add new Product
          </Typography>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={4}>
            <TextField
              label="Title"
              name="title"
              placeholder="title of product"
              value={product.title}
              onChange={handleInputChange}
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description"
              name="description"
              placeholder="description of product"
              value={product.description}
              onChange={handleInputChange}
              multiline
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="1"
              value={product.quantity}
              onChange={handleInputChange}
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Category"
              name="category"
              type="text"
              placeholder="category"
              value={product.category}
              onChange={handleInputChange}
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Image URL"
              name="imageUrl"
              type="text"
              placeholder="URL of product image"
              value={product.imageUrl}
              onChange={handleInputChange}
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddProductForm;
