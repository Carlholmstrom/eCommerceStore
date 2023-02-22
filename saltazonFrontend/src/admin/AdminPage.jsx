import AdminProductList from "./products/AdminProductList.jsx";
import { useState } from "react";

function AdminPage() {
  const currentStore = "Salt store number 2";
  const [storeId, setStoreId] = useState(0);

  return (
    <>
      <header>Welcome to the store!</header>
      <AdminProductList storeId={storeId} />
    </>
  );
}

export default AdminPage;
