import { Button, Input } from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function AddBrands() {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const requestBody = { title };
    axios
      .post("http://localhost:4000/api/brand/createBrand", requestBody)
      .then((response) => {
        console.log(response);
        setTitle("");
        toast("Branded Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="mb-4">Add Brands</h1>
      <Input
        value={title}
        type="text"
        name="text"
        placeholder="enter here"
        onChange={(e) => setTitle(e.target.value)}
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
        onClick={handleSubmit}
      >
        Add brands
      </button>
    </div>
  );
}

export default AddBrands;
