import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function AddStoreForm({}) {
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
    <>
      <h4>Add new Product</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name_input">Store Name</label>
        <input
          name="name"
          placeholder="Store name"
          id="name_input"
          value={newStore.name}
          onChange={handleInputChange}
        />
        <br />
        {/* <label htmlFor={"admin_input"}>Admin Id</label>
        <input type={"text"} id={"admin_input"} />
        <br /> */}
        <button type="submit">Add store</button>
        <br />
        {/* <button onClick={() => console.log("Added new store")}>
          Add Store
        </button> */}
      </form>
    </>
  );
}

export default AddStoreForm;
