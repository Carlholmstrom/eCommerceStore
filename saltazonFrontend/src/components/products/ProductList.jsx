import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Product from "./Product.jsx";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";

const PAGE_SIZE = 12;

function sortByCategory(products) {
  return products.sort((a, b) => a.category.localeCompare(b.category));
}

function ProductList({ addToCart }) {
  const [productData, setProductData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [end, setEnd] = useState(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(cookies.token != null);
  }, [cookies]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = cookies.token;
      if (token) {
        const response = await fetch("http://localhost:5179/api/Products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProductData(data);
      }
    };
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [cookies.token, isLoggedIn]);

  const sortedProducts = sortByCategory(productData);

  const handleLoadMore = () => {
    setEnd(end + PAGE_SIZE);
  };

  useEffect(() => {
    setProductsToShow(sortedProducts.slice(0, end));
  }, [end, sortedProducts]);

  const numProductsDisplayed = productsToShow.length;
  const totalNumProducts = sortedProducts.length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredProducts = sortedProducts.filter((product) => {
    const productName = product.title ? product.title.toLowerCase() : "";
    return (
      productName.includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter)
    );
  });

  const categories = [
    ...new Set(productData.map((product) => product.category)),
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {!isLoggedIn && (
        <>
          <Typography variant="h1" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please login or create a user to start shopping.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              sx={{ mr: 2, width: 150 }}
              component={Link}
              color="success"
              to={"/login"}
            >
              Login
            </Button>
            or &nbsp;
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/create-new-user"}
            >
              Create new user
            </Button>
          </Box>
        </>
      )}

      {isLoggedIn && (
        <>
          <h1>Products</h1>
          <TextField
            sx={{ m: 1, width: 300 }}
            label="Search products"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              fullWidth
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">
            Showing {numProductsDisplayed} out of {totalNumProducts} products
          </Typography>
        </>
      )}
      <Grid container spacing={2}>
        {filteredProducts.slice(0, end).map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Product key={p.id} product={p} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
      {end < filteredProducts.length && (
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More Products
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default ProductList;
