import React from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

function Orders() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .get("http://localhost:4000/api/brand/getallBrand")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getData();
  }, []);

  console.log(data);
  const deleteBrand = async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:4000/api/brand/deleteBrand/${id}`
      );
      console.log("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th>Brand</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((d, index) => (
            <Tr key={d._id}>
              <Td>{index + 1}</Td>
              <Td>{d.title}</Td>
              <Td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteBrand(d._id)}
                >
                  Delete
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
