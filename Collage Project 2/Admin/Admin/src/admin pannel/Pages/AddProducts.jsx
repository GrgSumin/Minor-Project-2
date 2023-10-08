import { Input } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

function AddProducts() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/brand/getallBrand")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/api/category/getallCategory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    quantity: "",
    title: "",
    description: "",
  });

  const [file, setFile] = useState();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("Title", product.title);
    formData.append("Brand", product.brand);
    formData.append("Category", product.category);
    formData.append("Price", product.price);
    formData.append("Quantity", product.quantity);
    formData.append("Description", product.description);

    const response = await axios.post(
      "http://localhost:4000/api/product/addProduct",
      formData
    );
    console.log(response.data);
    setProduct({
      name: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      title: "",
      description: "",
    });
    toast("product added");
  };

  return (
    <div>
      <h1 className="mb-5">Add products</h1>
      <div>
        <Input
          className="mb-5"
          type="text"
          value={product.title}
          placeholder="Enter Title"
          onChange={(e) => {
            setProduct((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <br></br>
        <Input
          className="mb-5"
          type="text"
          value={product.name}
          placeholder="Enter Name"
          onChange={(e) => {
            setProduct((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        <Input
          className="mb-5"
          type="number"
          value={product.price}
          placeholder="Enter Product Price"
          onChange={(e) => {
            setProduct((prev) => ({ ...prev, price: e.target.value }));
          }}
        />
        <select
          name=""
          className="form-control py-3 mb-5"
          id=""
          value={product.brand}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, brand: e.target.value }))
          }
        >
          <option>Select Brand</option>
          {brands?.map((brand) => (
            <option value={brand.title} key={brand._id}>
              {brand.title}
            </option>
          ))}
        </select>
        <select
          name=""
          className="form-control py-3 mb-5"
          id=""
          value={product.category}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option>Select Category</option>
          {categories?.map((category) => (
            <option value={category.title} key={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <Input
          className="mb-5"
          type="number"
          placeholder="Enter quntity"
          value={product.quantity}
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, quantity: e.target.value }))
          }
        />
        <Input
          className="mb-5"
          type="file"
          placeholder="Enter Image name"
          name="image"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <Input
          className="mb-5"
          type="text"
          placeholder="Enter description"
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
        <button
          style={{
            margin: "10px",
            backgroundColor: "skyblue",
            padding: "10px",
            border: "solid",
            borderColor: "aliceblue",
            borderRadius: "10px",
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
