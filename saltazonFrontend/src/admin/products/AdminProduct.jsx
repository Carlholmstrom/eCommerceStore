import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function AdminProduct({ product, updateQuantity, storeId }) {
  const [cookies] = useCookies(["token"]);

  const handleDelete = async () => {
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
      console.log(storeId);
      console.log("Inne i if");
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeId}/product/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Product deleted successfully");
      } else {
        console.log("Error deleting product");
      }
    }
  };

  return (
    <>
      <h1>{product.title}</h1>
      <h2>{product.description}</h2>
      <img src={product.imageUrl} alt={"picture of product"} />
      <input type={"number"} />
      <button onClick={() => updateQuantity(product.id, 5)}>
        Update quantity
      </button>
      <button onClick={handleDelete}>Delete product</button>
    </>
  );
}

export default AdminProduct;
