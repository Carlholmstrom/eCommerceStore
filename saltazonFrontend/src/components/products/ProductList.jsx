import React, { useState, useEffect } from "react";
import Product from "./Product.jsx";
import CategorySorter from "./CategorySorter.jsx";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";

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
      console.log(cookies);
      console.log(token);
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
    <Box display="flex" flexDirection="column">
      <Box>
        <CategorySorter
          categories={["First Category", "Second Category"]}
          sorterFunction={sortSomething}
        />
      </Box>
      <Box>
        {sortedProducts.map((p) => {
          return <Product key={p.id} product={p} addToCart={addToCart} />;
        })}
      </Box>
    </Box>
  );
}

export default ProductList;
