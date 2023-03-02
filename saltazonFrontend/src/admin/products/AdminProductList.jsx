import { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm.jsx";
import AdminProduct from "./AdminProduct.jsx";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Grid, Typography, Container } from "@mui/material";

function AdminProductList({ storeInfo }) {
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const decodedToken = token ? jwt_decode(token) : null;
  const isAdmin = decodedToken && decodedToken.storeId;
  const storeId = storeInfo?.id || decodedToken?.storeId || null;

  console.log("StoreInfo", storeInfo);
  console.log("Storeid", storeId);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeId}/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [storeId, token]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {/* <Typography variant="h4" align="center" gutterBottom>
            The items in {storeInfo.name}
          </Typography> */}
        </Grid>
        <Grid item xs={12}>
          <AddProductForm />
        </Grid>
        {products.map((p) => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <AdminProduct product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AdminProductList;
