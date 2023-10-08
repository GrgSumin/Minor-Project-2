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
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function ProductList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      axios
        .get("http://localhost:4000/api/product/getallProduct")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th>Title</Th>
            <Th>Brand</Th>
            <Th>Catgory</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((d, index) => {
            <Tr key={d._id}>
              <Td>{index + 1}</Td>
              <Td>{d.title}</Td>
              <Td>{d.Brand}</Td>
              <Td>{d.Category}</Td>
              <Td>{d.Price}</Td>
            </Tr>;
            console.log(data);
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductList;
