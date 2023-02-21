import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
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
      console.log(token);
      const response = await fetch(`http://localhost:5179/api/Stores/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newStore),
      });
      if (response.ok) {
        console.log("Store added successfully");
        alert("Store added successfully");
        navigate("/admin/super");
        setNewStore({
          name: "",
        });
      } else {
        console.log("Error adding store");
        alert("Error adding store");
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
            color="primary"
          >
            Add store
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default AddStoreForm;
