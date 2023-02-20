import { Link } from "react-router-dom";

function StoreOverview({ storeInfo }) {
  return (
    <div>
      <h3>StoreName: {storeInfo.name}</h3>
      <p>StoreId: {storeInfo.id}</p>
      <Link to={`/admin/${storeInfo.id}`}>Go to {storeInfo.name}</Link>
      <button>Delete Store</button>
    </div>
  );
}

export default StoreOverview;
