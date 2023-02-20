import { useState } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function AddProductForm({ storeId }) {
  const [cookies] = useCookies(["token"]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    quantity: 1,
    price: 0,
    category: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.token;
    if (token) {
      const decodedToken = jwt_decode(token);
      const storeId = decodedToken.storeId;
      console.log(storeId);
      const response = await fetch(
        `http://localhost:5179/api/Stores/${storeId}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        console.log("Product added successfully");
        setProduct({
          title: "",
          description: "",
          quantity: 1,
          price: 0,
          category: "",
          imageUrl: "",
        });
      } else {
        console.log("Error adding product");
      }
    }
  };

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h4>Add new Product</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title_input">Title</label>
        <input
          name="title"
          placeholder="title of product"
          id="title_input"
          value={product.title}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="description_input">Description</label>
        <textarea
          name="description"
          placeholder="description of product"
          id="description_input"
          value={product.description}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <label htmlFor="quantity_input">Quantity</label>
        <input
          name="quantity"
          type="number"
          placeholder={1}
          id="quantity_input"
          value={product.quantity}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="price_input">Price</label>
        <input
          name="price"
          type="number"
          id="price_input"
          value={product.price}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="category_input">Category</label>
        <input
          name="category"
          type="text"
          placeholder="category"
          id="category_input"
          value={product.category}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="imageUrl_input">Image URL</label>
        <input
          name="imageUrl"
          type="text"
          placeholder="URL of product image"
          id="imageUrl_input"
          value={product.imageUrl}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Add product</button>
      </form>
    </>
  );
}

export default AddProductForm;
