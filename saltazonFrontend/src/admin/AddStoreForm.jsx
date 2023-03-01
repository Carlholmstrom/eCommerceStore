import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

function AddStoreForm({}) {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [newStore, setNewStore] = useState({
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.token;
    if (token) {
      const response = await fetch(`http://localhost:5179/api/Stores/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStore),
      });
      if (response.ok) {
        toast.success("Store added successfully");
        navigate("/admin/super");
        setNewStore({
          name: "",
        });
      } else {
        toast.error("Error adding store");
      }
    }
  };

  const handleInputChange = (e) => {
    setNewStore({ ...newStore, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add new Store
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: 300, mb: 2 }}
          label="Store Name"
          name="name"
          placeholder="Store name"
          id="name_input"
          value={newStore.name}
          onChange={handleInputChange}
          fullWidth
        />
        <div>
          <Button
            sx={{ margin: 2 }}
            type="submit"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Add store
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default AddStoreForm;
