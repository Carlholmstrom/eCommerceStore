import { useState, useEffect } from "react";
import AddProductForm from "./AddProductForm.jsx";
import AdminProduct from "./AdminProduct.jsx";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function AdminProductList({ storeName }) {
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const decodedToken = token ? jwt_decode(token) : null;
  const storeId = decodedToken ? decodedToken.storeId : null;

  useEffect(() => {
    const fetchProducts = async () => {
      if (storeId) {
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
      }
    };
    fetchProducts();
  }, [storeId, token]);

  return (
    <div>
      <header>The items in {storeName}</header>
      <AddProductForm />
      {products.map((p) => {
        return <AdminProduct key={p.id} product={p} />;
      })}
    </div>
  );
}

export default AdminProductList;
