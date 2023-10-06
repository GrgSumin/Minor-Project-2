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

function BrandList() {
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default BrandList;
