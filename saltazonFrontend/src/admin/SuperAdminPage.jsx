import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { Typography, Button, Link, Grid } from "@mui/material";
import StoreOverview from "./StoreOverview.jsx";
import AddStoreForm from "./AddStoreForm.jsx";
import AdminProductList from "../admin/products/AdminProductList";

function SuperAdminPage() {
  const [stores, setStores] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const decodedToken = jwt_decode(token);
  const currentUser =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

  const [showProductList, setShowProductList] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = cookies.token;
      if (token) {
        const response = await fetch("http://localhost:5179/api/Stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setStores(data);
      }
    };
    fetchProducts();
  }, [cookies]);

  const handleStoreClick = (storeId) => {
    setSelectedStoreId(storeId);
    setShowProductList(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Welcome Almighty SuperAdmin: {currentUser}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddStoreForm />
      </Grid>
      {showProductList ? (
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => setShowProductList(false)}>
            Back to Store list
          </Button>
          <AdminProductList storeInfo={{ id: selectedStoreId }} />
        </Grid>
      ) : (
        stores.map((store) => (
          <Grid item key={store.id} xs={12} sm={6} md={4}>
            <StoreOverview
              storeInfo={{
                id: store.id,
                name: store.name,
                adminId: store.adminId,
              }}
              onClick={() => handleStoreClick(store.id)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default SuperAdminPage;
