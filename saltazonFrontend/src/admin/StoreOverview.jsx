import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

function StoreOverview({ storeInfo }) {
  const [cookies] = useCookies(["token"]);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
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
        toast.info("Store deleted successfully");
        setOpen(false);
      } else {
        toast.error("Error deleting store");
      }
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          StoreName: {storeInfo.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          StoreId: {storeInfo.id}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Link to={`/admin/${storeInfo.id}`}>
          <Button size="small" variant="outlined" sx={{ mr: 2, width: 200 }}>
            Go to {storeInfo.name}
          </Button>
        </Link>
        <Button
          size="small"
          sx={{ width: 100 }}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </CardActions>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this store?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default StoreOverview;
