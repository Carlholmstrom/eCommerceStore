import React, { useState, useEffect } from "react";
import Product from "./Product.jsx";
import "../../App.css";
import CategorySorter from "./CategorySorter.jsx";
import { useCookies } from "react-cookie";

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

function ProductList({ products, addToCart }) {
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

  let sortedProducts;
  if (sorted) {
    sortedProducts = sortByCategory(productData);
  } else {
    sortedProducts = productData;
  }
  return (
    <>
      <CategorySorter
        categories={["First Category", "Second Category"]}
        sorterFunction={sortSomething}
      />
      <section className={"product_list"}>
        {sortedProducts.map((p) => {
          return <Product key={p.id} product={p} addToCart={addToCart} />;
        })}
      </section>
    </>
  );
}

export default ProductList;
