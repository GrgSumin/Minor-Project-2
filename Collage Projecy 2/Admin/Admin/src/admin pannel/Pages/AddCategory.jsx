import { Button, Input } from "@chakra-ui/react";
import React from "react";

function AddCategory() {
  return (
    <div>
      <h1 className="mb-4">Add Categories</h1>

      <form action="">
        <Input type="text" name="text" placeholder="enter here" />

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
        >
          Add Categories
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
