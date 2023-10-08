import { Button, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddCategory() {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const requestBody = { title };
    axios
      .post("http://localhost:4000/api/category/createCategory", requestBody)

      .then((response) => {
        console.log(response);
        setTitle("");
        toast("Category Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="mb-4">Add Categories</h1>

      <Input
        value={title}
        type="text"
        name="text"
        placeholder="enter here"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
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
        Add Categories
      </button>
    </div>
  );
}

export default AddCategory;
