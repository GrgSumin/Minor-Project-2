import { Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

function AddProducts() {
  const [desc, setDesc] = useState();
  return (
    <div>
      <h1 className="mb-5">Add products</h1>
      <div>
        <form>
          <Input className="mb-5" type="text" placeholder="Enter Title" />
          <br></br>
          <Input
            className="mb-5"
            type="number"
            placeholder="Enter Product Price"
          />
          <select name="" className="form-control py-3 mb-5" id="">
            <option value="">Select Brand</option>
          </select>
          <select name="" className="form-control py-3 mb-5" id="">
            <option value="">Select Category</option>
          </select>
          <Input className="mb-5" type="number" placeholder="Enter quntity" />
          <Input className="mb-5" type="text" placeholder="Enter Image name" />

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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
