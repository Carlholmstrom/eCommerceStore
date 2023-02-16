import React, { useState, useEffect } from "react";
import Product from "./Product.jsx";
import CategorySorter from "./CategorySorter.jsx";
import { useCookies } from "react-cookie";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const sorted = false;

function sortByCategory(products) {
  console.log(products);
  return products.sort(compareProductCategory);
}

function compareProductCategory(a, b) {
  if (a.category < b.category) {
    return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}

function sortSomething(category) {
  console.log("sorting things would be cool" + category);
}

function ProductList({ addToCart }) {
  const [productData, setProductData] = useState([]);
  const [cookies] = useCookies(["token"]);

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

  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(productData);
  } else {
    sortedProducts = productData;
  }

  return (
    <Grid container spacing={2}>
      {sortedProducts.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p.id}>
          <Product product={p} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
