import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

function StoreOverview({ storeInfo }) {
  const [cookies] = useCookies(["token"]);

  const handleDelete = async () => {
    const token = cookies.token;
    if (token) {
      console.log("heeeeeeej");
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
        alert("Store deleted successfully");
      } else {
        console.log("Error deleting store");
        alert("Error deleting store");
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

  // return (
  //   <Card sx={{ width: 300, height: 250, margin: 2 }}>
  //     <CardContent>
  //       <Typography variant="h5" gutterBottom>
  //         StoreName: {storeInfo.name}
  //       </Typography>
  //       <Typography variant="body1" gutterBottom>
  //         StoreId: {storeInfo.id}
  //       </Typography>
  //     </CardContent>
  //     <CardActions>
  //       <Link to={`/admin/${storeInfo.id}`} color="primary">
  //         Go to {storeInfo.name}
  //       </Link>
  //       <Button variant="contained" onClick={handleDelete} sx={{ ml: 2 }}>
  //         Delete store
  //       </Button>
  //     </CardActions>
  //   </Card>
  // );
}

export default StoreOverview;
