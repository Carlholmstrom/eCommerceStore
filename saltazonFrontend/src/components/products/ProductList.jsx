import React, { useState, useEffect } from "react";
import Product from "./Product.jsx";
import CategorySorter from "./CategorySorter.jsx";
import { useCookies } from "react-cookie";
import { Box, Button, Grid, Typography } from "@mui/material";

const PAGE_SIZE = 12;

function sortByCategory(products) {
  console.log(products);
  return products.sort((a, b) => a.category.localeCompare(b.category));
}

function ProductList({ addToCart }) {
  const [productData, setProductData] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [end, setEnd] = useState(PAGE_SIZE);

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
        console.log(data);
        setProductData(data);
      }
    };
    fetchProducts();
  }, [cookies]);

  console.log(productData.length);

  const sortedProducts = sortByCategory(productData);

  const handleLoadMore = () => {
    setEnd(end + PAGE_SIZE);
  };

  useEffect(() => {
    setProductsToShow(sortedProducts.slice(0, end));
  }, [end, sortedProducts]);

  const numProductsDisplayed = productsToShow.length;
  const totalNumProducts = sortedProducts.length;

  return (
    <>
      <Typography variant="subtitle1">
        Showing {numProductsDisplayed} out of {totalNumProducts} products
      </Typography>
      <Grid container spacing={2}>
        {productsToShow.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Product product={p} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
      {end < sortedProducts.length && (
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More Products
          </Button>
        </Box>
      )}
    </>
  );
}

export default ProductList;
