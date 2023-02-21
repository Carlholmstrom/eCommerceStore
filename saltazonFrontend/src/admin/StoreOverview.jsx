import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function StoreOverview({ storeInfo }) {
  const [cookies] = useCookies(["token"]);

  const handleDelete = async () => {
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
      console.log(storeId);
      console.log(token);
      console.log(storeInfo.id);
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeInfo.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.log("Store deleted successfully");
      } else {
        console.log("Error deleting store");
      }
    }
  };

  return (
    <div>
      <h3>StoreName: {storeInfo.name}</h3>
      <p>StoreId: {storeInfo.id}</p>
      <Link to={`/admin/${storeInfo.id}`}>Go to {storeInfo.name}</Link>
      <button onClick={handleDelete}>Delete store</button>
    </div>
  );
}

export default StoreOverview;
