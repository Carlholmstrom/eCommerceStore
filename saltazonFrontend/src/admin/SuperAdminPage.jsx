import StoreOverview from "./StoreOverview.jsx";
import AddStoreForm from "./AddStoreForm.jsx";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function SuperAdminPage() {
  const [stores, setStores] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const decodedToken = jwt_decode(token);
  const currentUser =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

  useEffect(() => {
    const fetchProducts = async () => {
      const token = cookies.token;
      console.log(token);
      if (token) {
        const response = await fetch("http://localhost:5179/api/Stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setStores(data);
      }
    };
    fetchProducts();
  }, [cookies]);

  return (
    <>
      <header>Welcome Almighty SuperAdmin {currentUser}</header>
      <AddStoreForm />
      {stores.map((store) => (
        <StoreOverview
          storeInfo={{ id: store.id, name: store.name, adminId: store.adminId }}
        />
      ))}
    </>
  );
}

export default SuperAdminPage;
